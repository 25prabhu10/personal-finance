// @ts-check

import js from '@eslint/js'
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import reactDom from 'eslint-plugin-react-dom'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  { linterOptions: { reportUnusedDisableDirectives: "error" } },
  js.configs.recommended,
  perfectionist.configs["recommended-natural"],
  {
		extends: [packageJson.configs.recommended],
		files: ["**/package.json"],
	},
  {
    extends: [...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {...globals.browser,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',},
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-dom': reactDom,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
      "@typescript-eslint/restrict-template-expressions": ["error",{
        allowBoolean: true,
        allowNullish: true,
        allowNumber: true,
      }],
      "logical-assignment-operators": [
				"error",
				"always",
				{ enforceForIfStatements: true },
			],
      "no-useless-rename": "error",
			"object-shorthand": "error",
			"operator-assignment": "error",
			'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: { perfectionist: { partitionByComment: true, type: "natural" } },
  },
)
