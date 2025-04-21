import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi'
import type { PinoLogger } from 'hono-pino'

import type parsedEnv from './parsed-env'

export interface AppBindings {
  Variables: {
    logger: PinoLogger
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type AppOpenAPI = OpenAPIHono<AppBindings, {}, typeof parsedEnv.BASE_PATH>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>
