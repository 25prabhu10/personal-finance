import type { ConfigArray } from 'typescript-eslint'

declare module '@pf/eslint-config' {
  const config: ConfigArray
  export default config
}
