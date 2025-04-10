// @ts-check

import js from '@eslint/js'
import nodePlugin from 'eslint-plugin-n'
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  perfectionist.configs["recommended-natural"],
  nodePlugin.configs["flat/recommended-script"],
  {
		extends: [packageJson.configs.recommended],
		files: ["**/package.json"],
	},
  {
    extends: [...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,],
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {},
    rules: {
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
    },
    settings: { perfectionist: { partitionByComment: true, type: "natural" } },
  },
)
