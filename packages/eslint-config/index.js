// @ts-check

import js from '@eslint/js'
import packageJson from "eslint-plugin-package-json";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from 'typescript-eslint'
import eslintPluginUnicorn from 'eslint-plugin-unicorn';


export default tseslint.config(
    { ignores: ['dist'] },
    { linterOptions: { reportUnusedDisableDirectives: "error" } },
    js.configs.recommended,
    perfectionist.configs["recommended-natural"],
    {
        extends:[eslintPluginUnicorn.configs.recommended],
        rules: {
            "unicorn/prevent-abbreviations": 'off',
            "unicorn/prefer-query-selector": "off"
        }
    },
    {
          extends: [packageJson.configs.recommended],
          files: ["**/package.json"],
      },
    {
      extends: [...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked,],
      files: ['**/*.{js,mjs,cjs,ts}'],
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
  

  