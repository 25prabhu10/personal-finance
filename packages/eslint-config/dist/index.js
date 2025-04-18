import js from '@eslint/js';
import packageJson from 'eslint-plugin-package-json';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint, {} from 'typescript-eslint';
export default tseslint.config({ ignores: ['dist'] }, { linterOptions: { reportUnusedDisableDirectives: 'error' } }, js.configs.recommended, perfectionist.configs['recommended-natural'], {
    extends: [eslintPluginUnicorn.configs.recommended],
    rules: {
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/prefer-query-selector': 'off',
        'unicorn/prefer-top-level-await': 'off',
        'unicorn/no-null': 'off'
    }
}, {
    extends: [packageJson.configs.recommended],
    files: ['**/package.json']
}, {
    extends: [
        ...tseslint.configs.recommendedTypeChecked,
        ...tseslint.configs.strictTypeChecked,
        ...tseslint.configs.stylisticTypeChecked
    ],
    files: ['**/*.{ts,tsx}'],
    rules: {
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            {
                allowBoolean: true,
                allowNullish: true,
                allowNumber: true
            }
        ],
        'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
        'no-useless-rename': 'error',
        'object-shorthand': 'error',
        'operator-assignment': 'error',
        'perfectionist/sort-objects': 'off'
    },
    settings: { perfectionist: { partitionByComment: true, type: 'natural' } }
}, {
    extends: [tseslint.configs.disableTypeChecked],
    files: ['**/*.{js,jsx,mjs,cjs}']
});
