import type { Config } from 'prettier'

declare module '@pf/prettier-config' {
  const config: Config
  export default config
}
