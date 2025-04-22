import { userRequest, userResponse, usersResponse, userUpdateRequest } from '@/db/schemas'
import * as HttpStatusCodes from '@/lib/constants/http-status-codes'
import * as Messages from '@/lib/constants/messages'
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
  summary: Messages.GET_USER_SUMMARY,
  description: Messages.GET_USER_DESC,
  request: {
    params: usernameParamsSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(userResponse, Messages.GET_USER_SUCCESS_DESC),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema(Messages.USER_NOT_FOUND),
      Messages.USER_NOT_FOUND
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(usernameParamsSchema),
      Messages.INVALID_USERNAME_DESC
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema(Messages.FETCH_USER_FAILED),
      Messages.REQUEST_FAILED_DESC
    )
  },
  tags
})

export const getUsers = createRoute({
  path: '/users',
  method: 'get',
  summary: Messages.GET_USERS_SUMMARY,
  description: Messages.GET_USERS_DESC,
  request: {
    query: paginationParamSchema
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(usersResponse, Messages.GET_USERS_SUCCESS_DESC),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(paginationParamSchema),
      Messages.INVALID_PAGINATION_DESC
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema(Messages.FETCH_USERS_FAILED),
      Messages.REQUEST_FAILED_DESC
    )
  },
  tags
})

export const createUser = createRoute({
  path: '/users',
  method: 'post',
  summary: Messages.CREATE_USER_SUMMARY,
  description: Messages.CREATE_USER_DESC,
  request: {
    body: jsonContentRequired(userRequest, Messages.CREATE_USER_REQUEST_BODY_DESC)
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(userResponse, Messages.CREATE_USER_SUCCESS_DESC),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(userRequest),
      Messages.VALIDATION_ERROR_DESC
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema(Messages.USER_ALREADY_EXISTS),
      Messages.USER_ALREADY_EXISTS
    )
  },
  tags
})

export const updateUser = createRoute({
  path: '/users/:username',
  method: 'post',
  summary: Messages.UPDATE_USER_SUMMARY,
  description: Messages.UPDATE_USER_DESC,
  request: {
    params: usernameParamsSchema,
    body: jsonContentRequired(userUpdateRequest, Messages.UPDATE_USER_REQUEST_BODY_DESC)
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      userUpdateRequest.or(createMessageObjectSchema(Messages.UPDATE_NO_CHANGES)),
      Messages.UPDATE_USER_SUCCESS_DESC
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(userUpdateRequest),
      Messages.VALIDATION_ERROR_DESC
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema(Messages.USER_NOT_FOUND),
      Messages.USER_NOT_FOUND
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      createMessageObjectSchema(Messages.EMAIL_ALREADY_EXISTS),
      Messages.EMAIL_ALREADY_EXISTS
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      createMessageObjectSchema(Messages.UPDATE_USER_FAILED),
      Messages.UPDATE_FAILED_DESC
    )
  },
  tags
})

export const deleteUser = createRoute({
  path: '/users/:username',
  method: 'delete',
  summary: Messages.DELETE_USER_SUMMARY,
  description: Messages.DELETE_USER_DESC,
  request: {
    params: usernameParamsSchema
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: Messages.DELETE_USER_SUCCESS_DESC
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      createMessageObjectSchema(Messages.USER_NOT_FOUND),
      Messages.USER_NOT_FOUND
    )
  },
  tags
})

export type CreateUser = typeof createUser
export type DeleteUser = typeof deleteUser
export type GetUserByUsername = typeof getUserByUsername
export type GetUsers = typeof getUsers
export type UpdateUser = typeof updateUser
