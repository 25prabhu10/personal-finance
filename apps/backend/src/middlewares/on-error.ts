import type { ErrorHandler } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

import { INTERNAL_SERVER_ERROR, OK } from '@/lib/constants/http-status-codes'
import parsedEnv from '@/lib/parsed-env'

// Error handler
const onError: ErrorHandler = (err, c) => {
  // Get the status code from the error object
  // or use the default status code from the response object
  const currentStatus = 'status' in err ? err.status : c.newResponse(null).status

  // Set the status code to the error status code
  // or use INTERNAL_SERVER_ERROR as the default status code
  const statusCode =
    currentStatus === OK ? INTERNAL_SERVER_ERROR : (currentStatus as ContentfulStatusCode)

  // Get the environment from the request object
  // to show the stack trace only in development mode

  return c.json(
    {
      message: err.message || 'Could not complete the request, try again later',
      stack: parsedEnv.NODE_ENV === 'production' ? undefined : err.stack
    },
    statusCode
  )
}

export default onError
