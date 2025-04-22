import type { InsertUser, UserUpdate } from '@/db/schemas'
import type { AppRouteHandler } from '@/lib/types'

import db from '@/db'
import { withPagination } from '@/db/db-utils'
import { userResponse, usersResponse, usersTable } from '@/db/schemas'
import { createPasswordHash } from '@/lib/auth'
import * as HttpStatusCodes from '@/lib/constants/http-status-codes'
import * as Messages from '@/lib/constants/messages'
import { desc, eq } from 'drizzle-orm'
import { HTTPException } from 'hono/http-exception'

import type {
  CreateUser,
  DeleteUser,
  GetUserByUsername,
  GetUsers,
  UpdateUser
} from './users.routes'

export const getUserByUsername: AppRouteHandler<GetUserByUsername> = async (c) => {
  const { username } = c.req.valid('param')

  const queryData = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
    columns: {
      id: false,
      passwordHash: false,
      createdAt: false,
      updatedAt: false
    }
  })

  if (!queryData) {
    return c.json({ message: Messages.USER_NOT_FOUND }, HttpStatusCodes.NOT_FOUND)
  }

  const result = userResponse.safeParse(queryData)

  if (!result.success) {
    throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
      message: Messages.FETCH_USER_FAILED
    })
  }

  return c.json(result.data, HttpStatusCodes.OK)
}

export const getUsers: AppRouteHandler<GetUsers> = async (c) => {
  const { limit, offset, orderBy } = c.req.valid('query')

  let query = db
    .select({
      name: usersTable.name,
      username: usersTable.username,
      email: usersTable.email
    })
    .from(usersTable)
    .$dynamic()

  if (limit) {
    query = withPagination(query, limit, offset ?? 0)
  }

  query = orderBy === 'desc' ? query.orderBy(desc(usersTable.id)) : query.orderBy(usersTable.id)

  const result = usersResponse.safeParse(await query)

  if (!result.success) {
    throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
      message: Messages.FETCH_USERS_FAILED
    })
  }

  return c.json(result.data, HttpStatusCodes.OK)
}

export const createUser: AppRouteHandler<CreateUser> = async (c) => {
  const userData = c.req.valid('json')

  const newUserData: InsertUser = {
    name: userData.name,
    username: userData.username,
    email: userData.email,
    passwordHash: await createPasswordHash(userData.password)
  }

  const result = await db
    .insert(usersTable)
    .values(newUserData)
    .returning({ name: usersTable.name, username: usersTable.username, email: usersTable.email })
    .onConflictDoNothing()

  if (result.length === 0) {
    return c.json({ message: Messages.USER_ALREADY_EXISTS }, HttpStatusCodes.CONFLICT)
  }

  return c.json(result[0], HttpStatusCodes.CREATED)
}

export const updateUser: AppRouteHandler<UpdateUser> = async (c) => {
  const { username } = c.req.valid('param')
  const updateData = c.req.valid('json')

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
    columns: {
      name: true,
      email: true
    }
  })

  if (!user) {
    return c.json({ message: Messages.USER_NOT_FOUND }, HttpStatusCodes.NOT_FOUND)
  }

  const dataToUpdate: UserUpdate = {}

  // Only add fields to update if they are provided and different from the current value
  if (updateData.name !== undefined && updateData.name !== user.name) {
    dataToUpdate.name = updateData.name
  }
  if (updateData.email !== undefined && updateData.email !== user.email) {
    // Check for email conflict before adding it to the update object
    const emailExists = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, updateData.email),
      columns: {
        username: true // Check if any user (other than potentially the current one) has this email
      }
    })

    // Allow update if the email doesn't exist OR if it belongs to the current user being updated
    if (emailExists && emailExists.username !== username) {
      return c.json({ message: Messages.EMAIL_ALREADY_EXISTS }, HttpStatusCodes.CONFLICT)
    }
    dataToUpdate.email = updateData.email
  }

  if (Object.keys(dataToUpdate).length === 0) {
    return c.json({ message: Messages.UPDATE_NO_CHANGES }, HttpStatusCodes.OK)
  }

  const result = await db
    .update(usersTable)
    .set(dataToUpdate)
    .where(eq(usersTable.username, username))
    .returning({
      name: usersTable.name,
      email: usersTable.email
    })

  if (result.length === 0) {
    throw new HTTPException(HttpStatusCodes.INTERNAL_SERVER_ERROR, {
      message: Messages.UPDATE_USER_FAILED
    })
  }

  return c.json(result[0], HttpStatusCodes.OK)
}

export const deleteUser: AppRouteHandler<DeleteUser> = async (c) => {
  const { username } = c.req.valid('param')

  // Check if user exists before attempting to delete
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.username, username),
    columns: { username: true }
  })

  if (!user?.username) {
    return c.json({ message: Messages.USER_NOT_FOUND }, HttpStatusCodes.NOT_FOUND)
  }

  // Attempt to delete the user
  await db.delete(usersTable).where(eq(usersTable.username, username))

  return c.body(null, HttpStatusCodes.NO_CONTENT)
}
