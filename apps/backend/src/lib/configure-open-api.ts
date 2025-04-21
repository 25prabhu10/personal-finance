import type { AppOpenAPI } from '@/lib/types'

import packageJSON from '@/../package.json' with { type: 'json' }
import { Scalar } from '@scalar/hono-api-reference'

import parsedEnv from './parsed-env'

export default function configureOpenAPI(app: AppOpenAPI) {
  // OpenAPI JSON document
  // refer: https://github.com/OAI/OpenAPI-Specification
  app.doc('/openapi.json', {
    openapi: '3.1.1',
    info: {
      version: packageJSON.version,
      title: packageJSON.title,
      description: packageJSON.description
    },
    servers: [
      {
        url: `${parsedEnv.BASE_URL}:${parsedEnv.PORT}`,
        description: 'The URL of the API server'
      }
    ]
  })

  // Endpoint for the API reference using Scalar UI
  // refer: https://github.com/scalar/scalar/blob/main/integrations/hono/README.md
  app.get(
    '/api-reference',
    Scalar({
      theme: 'kepler',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch'
      },
      url: `${parsedEnv.BASE_PATH}/openapi.json`
    })
  )
}
