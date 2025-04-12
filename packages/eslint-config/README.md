# @pf/eslint-config

ESLint configuration for Personal Finance management tool.

## Overview

This package provides a shared ESLint configuration used throughout the Personal Finance application. It helps maintain consistent code quality and style across all packages in the monorepo.

## Installation

This package is private and intended to be used within the Personal Finance project. It's included in the workspace and should be installed via the project's package manager:

```bash
pnpm install
```

If you need to install it in a new workspace package:

```bash
pnpm add -D @pf/eslint-config
```

## Usage

Add the configuration to your `.eslintrc.js` or equivalent configuration file:

```js
import pfConfig from '@pf/eslint-config';

export default [
  pfConfig,
  // Your additional configuration...
];

// or

import baseConfig from '@pf/eslint-config'

export default tseslint.config(
  {
    extends: [
      ...baseConfig
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
)

```

## Requirements

This package has the following peer dependencies:

- `@eslint/js`
- `eslint`
- `eslint-plugin-package-json`
- `eslint-plugin-perfectionist`
- `typescript-eslint`
