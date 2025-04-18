// @ts-check

import baseConfig from '@pf/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  baseConfig,
  pluginRouter.configs['flat/recommended'],
  { ignores: ['./src/routeTree.gen.ts'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      'react-dom': reactDom,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
)
