import parsedEnv from '@/lib/parsed-env'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schemas',
  out: './src/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: parsedEnv.DATABASE_URL
  },
  verbose: true,
  strict: true
})
