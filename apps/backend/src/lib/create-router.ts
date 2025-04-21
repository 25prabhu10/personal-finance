import { OpenAPIHono } from '@hono/zod-openapi'

import type { AppBindings } from './types'

import { defaultHook } from './openapi'

export default function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook
  })
}
