import { z } from '@hono/zod-openapi'

const paginationParamSchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional().openapi({
    example: 2,
    description: 'Number of items to return per page'
  }),
  offset: z.coerce.number().min(0).max(1000).optional().openapi({
    example: 5,
    description: 'Number of items to skip before returning results'
  }),
  orderBy: z.enum(['asc', 'desc']).optional().openapi({
    example: 'asc',
    description: 'Sort order of the results'
  })
})

export default paginationParamSchema
