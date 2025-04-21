import * as HttpStatusCodes from '@/lib/constants/http-status-codes'
import createRouter from '@/lib/create-router'
import parsedEnv from '@/lib/parsed-env'
import { createRoute } from '@hono/zod-openapi'

const openapiPath = `${parsedEnv.BASE_PATH}/openapi.json`

const homeRouter = createRouter().openapi(
  createRoute({
    path: '/',
    method: 'get',
    summary: 'Home',
    description: 'Welcome to your Personal Finance API!',
    responses: {
      [HttpStatusCodes.MOVED_TEMPORARILY]: {
        description: `Redirect to OpenAPI documentation "${openapiPath}"`,
        headers: {
          Location: {
            schema: {
              type: 'string'
            },
            description: 'URL to redirect to OpenAPI documentation'
          }
        }
      }
    },
    tags: ['Index']
  }),
  (c) => c.redirect(openapiPath)
)

export default homeRouter
