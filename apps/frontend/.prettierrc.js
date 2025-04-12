import pfPrettierConfig from '@pf/prettier-config'

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...pfPrettierConfig,
  plugins: [...pfPrettierConfig.plugins, 'prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/index.css'
}

export default config
