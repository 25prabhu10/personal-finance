import { notFound, onError, pinoLogger, serveEmojiFavicon } from '@/middlewares'
import { prettyJSON } from 'hono/pretty-json'
import { requestId } from 'hono/request-id'
import { secureHeaders } from 'hono/secure-headers'

import type { AppOpenAPI } from './types'

import createRouter from './create-router'

export default function createApp() {
  const app = createRouter()

  app
    .use(secureHeaders())
    .use(requestId())
    .use(pinoLogger())
    .use(serveEmojiFavicon('🏦'))
    .use(prettyJSON())
    .notFound(notFound)
    .onError(onError)

  return app
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router)
}
