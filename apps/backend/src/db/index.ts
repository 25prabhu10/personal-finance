import parsedEnv from '@/lib/parsed-env'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from './schemas'

const db = drizzle(parsedEnv.DATABASE_URL, { schema, logger: true })

export default db
