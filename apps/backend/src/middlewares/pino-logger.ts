import parsedEnv from '@/lib/parsed-env'
import { pinoLogger as logger } from 'hono-pino'
import { pino } from 'pino'
import PinoPretty from 'pino-pretty'

export const appLogger = pino(
  {
    level: parsedEnv.LOG_LEVEL
  },
  parsedEnv.NODE_ENV === 'production' ? undefined : PinoPretty()
)

export default function pinoLogger() {
  return logger({
    pino: appLogger
  })
}
