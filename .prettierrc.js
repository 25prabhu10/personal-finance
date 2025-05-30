/**
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'none',
  bracketSameLine: true,
  plugins: ['prettier-plugin-packagejson']
}

export default config
