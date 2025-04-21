import type { AppOpenAPI } from '@/lib/types'

import parsedEnv from '@/lib/parsed-env'
import home from '@/routes/home.route'

import users from './users/users.index'

export function registerRoutes(app: AppOpenAPI) {
  return app.basePath(parsedEnv.BASE_PATH).route('/', home).route('/', users)
}
