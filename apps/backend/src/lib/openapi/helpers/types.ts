import type { z } from '@hono/zod-openapi'

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
// @ts-expect-error This is a workaround for the issue with `zod` types
export type ZodSchema = z.AnyZodObject | z.ZodArray<z.AnyZodObject> | z.ZodUnion
