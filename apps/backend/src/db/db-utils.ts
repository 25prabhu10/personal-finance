import type { SQLiteSelect } from 'drizzle-orm/sqlite-core'

export function withPagination<T extends SQLiteSelect>(qb: T, limit = 10, offset = 0) {
  return qb.limit(limit).offset(limit * offset)
}
