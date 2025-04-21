// @ts-check

import baseConfig from '@pf/eslint-config'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(baseConfig, nodePlugin.configs['flat/recommended-script'], {
  files: ['**/*.{js,ts,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: globals.node,
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname
    },
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/no-unnecessary-type-parameters': 'off',
    'n/no-missing-import': 'off',
    'n/no-process-exit': 'off',
    'unicorn/no-process-exit': 'off'
  }
})
