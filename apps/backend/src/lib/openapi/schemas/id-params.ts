import { z } from '@hono/zod-openapi'

const usernameParamsSchema = z.object({
  username: z
    .string()
    .min(1)
    .max(255)
    .openapi({
      param: {
        name: 'username'
      },
      required: ['username'],
      example: 'johndoe',
      description: 'Username of the user to fetch'
    })
})

export default usernameParamsSchema
