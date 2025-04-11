// @ts-check

import baseConfig from '@pf/eslint-config'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(nodePlugin.configs['flat/recommended-script'], baseConfig, {
  files: ['**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    ecmaVersion: 'latest',
    globals: globals.node,
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.js', '.prettierrc.js'],
        defaultProject: 'tsconfig.json'
      },
      tsconfigRootDir: import.meta.dirname
    },
    sourceType: 'module'
  }
})
