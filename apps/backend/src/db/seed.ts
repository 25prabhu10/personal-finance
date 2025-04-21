import parsedEnv from '@/lib/parsed-env'
import { appLogger } from '@/middlewares'
import { drizzle } from 'drizzle-orm/libsql'
import { reset, seed } from 'drizzle-seed'

import * as schema from './schemas'

async function runSeed() {
  // create a new database connection
  const db = drizzle(parsedEnv.DATABASE_URL)

  // reset the database and seed it with data
  await reset(db, { users: schema.usersTable })
  await seed(db, { users: schema.usersTable }).refine((f) => ({
    users: {
      count: 50,
      columns: {
        createdAt: f.datetime(),
        updatedAt: f.datetime()
      }
    }
  }))
}

// run the seed function
try {
  await runSeed()
  appLogger.info('Seeding complete')
  process.exit(0)
} catch (error) {
  console.error('Error seeding data:', error)
  process.exit(1)
}
