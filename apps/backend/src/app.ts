import configureOpenAPI from '@/lib/configure-open-api'
import createApp from '@/lib/create-app'
import { registerRoutes } from '@/routes'

// Create an app instance
const app = registerRoutes(createApp())

// Configure OpenAPI
configureOpenAPI(app)

// Export the app instance
export default app
