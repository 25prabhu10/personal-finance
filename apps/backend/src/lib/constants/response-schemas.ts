import { createMessageObjectSchema } from '@/lib/openapi/schemas'

import * as HttpStatusPhrases from './http-status-phrases'

// error schemas for common
export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)
