import type { AppOpenAPI } from '@/lib/types'

import parsedEnv from '@/lib/parsed-env'
import home from '@/routes/home.route'

export function registerRoutes(app: AppOpenAPI) {
  return app.basePath(parsedEnv.BASE_PATH).route('/', home)
}
