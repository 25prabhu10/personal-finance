// @ts-check

import baseConfig from '@pf/eslint-config'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(nodePlugin.configs['flat/recommended-script'], baseConfig, {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: globals.node,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    },
    sourceType: 'module'
  }
})
