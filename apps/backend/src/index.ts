import parsedEnv from '@/lib/parsed-env'
import { serve } from '@hono/node-server'

import app from './app'

const port = parsedEnv.PORT

if (parsedEnv.NODE_ENV === 'development') {
  await import('@/middlewares/pino-logger').then(({ appLogger }) => {
    appLogger.info('Starting server...')
    appLogger.info(JSON.stringify({ parsedEnv }, null, 2))
  })
}

serve({
  fetch: app.fetch,
  port
})
