import type { ZodSchema } from '@/lib/openapi/helpers/types'
import type { ZodError } from 'zod'

import { z } from '@hono/zod-openapi'

function createErrorSchema<T extends ZodSchema>(schema: T) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { error } = schema.safeParse(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {}
  ) as { error: ZodError<T> }
  return z.object({
    success: z.boolean().openapi({
      description: 'Indicates whether the request was successful',
      example: false
    }),
    error: z
      .object({
        issues: z.array(
          z.object({
            code: z.string().openapi({
              description: 'Error code',
              example: 'too_small'
            }),
            path: z.array(z.union([z.string(), z.number()])).openapi({
              description: 'Path to the error',
              example: ['age']
            }),
            message: z.string().optional().openapi({
              description: 'Error message',
              example: 'Number must be greater than or equal to 1'
            })
          })
        ),
        name: z.string().openapi({
          description: 'Error name',
          example: 'ZodError'
        })
      })
      .openapi({
        description: 'Error object',
        example: error
      })
      .openapi('Error')
  })
}

export default createErrorSchema
