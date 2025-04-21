import { z } from '@hono/zod-openapi'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createSchemaFactory } from 'drizzle-zod'

export const usersTable = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { length: 255 }).notNull(),
  username: text('username', { length: 255 }).notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
})

const { createInsertSchema, createSelectSchema, createUpdateSchema } = createSchemaFactory({
  zodInstance: z
})

export const userResponse = createSelectSchema(usersTable)
  .pick({
    name: true,
    username: true,
    email: true
  })
  .extend({
    name: z.string().min(1).max(255).openapi({
      example: 'John Doe',
      description: "User's full name"
    }),
    username: z.string().min(1).max(255).openapi({
      example: 'johndoe',
      description: 'Unique username of the user'
    }),
    email: z.string().email().openapi({
      example: 'jondoe@email.com',
      description: "User's email address"
    })
  })
  .openapi('User')

export const usersResponse = z.array(userResponse).openapi({
  description: 'List of users',
  example: [
    {
      email: 'jondoe@email.com',
      name: 'John Doe',
      username: 'johndoe'
    }
  ]
})

export const userRequest = createInsertSchema(usersTable)
  .pick({
    name: true,
    username: true,
    email: true
  })
  .extend({
    name: z.string().min(1).max(255).openapi({
      example: 'John Doe',
      description: 'The name of the user'
    }),
    username: z.string().min(1).max(255).openapi({
      example: 'johndoe',
      description: 'The username of the user (should be unique)'
    }),
    email: z.string().max(255).email().openapi({
      example: 'jondoe@email.com',
      description: 'The email of the user'
    }),
    password: z.string().min(8).max(255).openapi({
      example: 'password123',
      description: 'The password of the user'
    }),
    confirmPassword: z.string().min(8).max(255).openapi({
      example: 'password123',
      description: 'The password confirmation of the user'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })
  .openapi({
    description: 'Create a new user'
  })
  .openapi('CreateUser')

export const userUpdateRequest = createUpdateSchema(usersTable)
  .pick({
    name: true,
    email: true
  })
  .extend({
    name: z.string().min(1).max(255).optional().openapi({
      example: 'John Doe',
      description: 'The name of the user'
    }),
    email: z.string().max(255).email().optional().openapi({
      example: 'jondoe@email.com',
      description: 'The email of the user'
    })
  })
  .openapi({
    description: 'Update user information'
  })
  .openapi('UpdateUser')

export type InsertUser = Omit<typeof usersTable.$inferInsert, 'createdAt' | 'id' | 'updatedAt'>
export type UserUpdate = z.infer<typeof userUpdateRequest>
