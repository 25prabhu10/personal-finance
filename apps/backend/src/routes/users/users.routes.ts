import { userRequest, userResponse, usersResponse, userUpdateRequest } from '@/db/schemas'
import * as HttpStatusCodes from '@/lib/constants/http-status-codes'
import { jsonContent, jsonContentRequired } from '@/lib/openapi/helpers'
import {
  createErrorSchema,
  createMessageObjectSchema,
  paginationParamSchema,
  usernameParamsSchema
} from '@/lib/openapi/schemas'
import { createRoute } from '@hono/zod-openapi'

const tags = ['Users']

export const getUserByUsername = createRoute({
  path: '/users/:username',
  method: 'get',
  summary: 'Get User',
  description: 'Get user by username',
  request: {
    params: usernameParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userResponse, 'Get a user by username'),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('User not found'),
      'User not found'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(usernameParamsSchema),
      'Invalid username error'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema('Could not complete the request, try again later'),
      'Could not complete the request, try again later'
    )
  },
  tags
})

export const getUsers = createRoute({
  path: '/users',
  method: 'get',
  summary: 'Get Several Users',
  description: 'Get several users with pagination options',
  request: {
    query: paginationParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(usersResponse, 'Get all users'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(paginationParamSchema),
      'Invalid pagination options error'
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema('Could not complete the request, try again later'),
      'Could not complete the request, try again later'
    )
  },
  tags
})

export const createUser = createRoute({
  path: '/users',
  method: 'post',
  summary: 'Create User',
  description: 'Create a new user using the provided data',
  request: {
    body: jsonContentRequired(userRequest, 'User to create')
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(userResponse, 'User created'),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(userRequest),
      'The validation error(s)'
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema('User already exists'),
      'User already exists'
    )
  },
  tags
})

export const updateUser = createRoute({
  path: '/users/:username',
  method: 'post',
  summary: 'Update User',
  description: 'Update a user by username',
  request: {
    params: usernameParamsSchema,
    body: jsonContentRequired(userUpdateRequest, 'User to create')
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      userUpdateRequest.or(createMessageObjectSchema('No changes to apply')),
      'User updated'
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(userUpdateRequest),
      'The validation error(s)'
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('User not found'),
      'User not found'
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema('Email already exists'),
      'Email already exists'
    )
  },
  tags
})

export const deleteUser = createRoute({
  path: '/users/:username',
  method: 'delete',
  summary: 'Delete User',
  description: 'Delete a user by username',
  request: {
    params: usernameParamsSchema
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'User deleted'
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema('User not found'),
      'User not found'
    )
  },
  tags
})

export type CreateUser = typeof createUser
export type DeleteUser = typeof deleteUser
export type GetUserByUsername = typeof getUserByUsername
export type GetUsers = typeof getUsers
export type UpdateUser = typeof updateUser
