import { z } from '@hono/zod-openapi'

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(9999),
  BASE_URL: z.string().url(),
  BASE_PATH: z.string(),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),
  DATABASE_URL: z.string().url()
})

export type ParsedEnv = z.infer<typeof EnvSchema>

const { data: parsedEnv, error } = await EnvSchema.safeParseAsync(process.env)

if (error) {
  console.error('❌ Invalid env:')
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2))
  process.exit(1)
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default parsedEnv as ParsedEnv
