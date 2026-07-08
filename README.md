# UT Research Blocks

Research-focused blocks, patterns, and styles for University of Tennessee WordPress sites.

## Prerequisites

- Node.js and npm
- Composer
- WordPress 6.4+
- PHP 8.0+

## Setup

```bash
npm install
composer install
```

`npm install` automatically sets up Git pre-commit hooks via Husky.

## Build

Compiled assets are written to `build/` and are not committed to the repository. Run a build after cloning or changing source files.

```bash
# Development build with watch mode
npm start

# Production build
npm run build
```

## Distribution

```bash
./build-dist.sh
```

Creates `dist/ut-research-blocks.zip` with production-ready plugin files (excludes development sources per `.distignore`).

## Linting

Pre-commit hooks run ESLint, Stylelint, and PHPCS on staged files. To lint manually:

```bash
npm run lint:all

# Individual linters
npm run lint:js
npm run lint:css
npm run lint:php

# Auto-fix where supported
npm run lint:js:fix
npm run lint:css:fix
npm run format:all
```

## Deployment

A deploy workflow template is included for your team to configure. See [.github/workflows/README.md](.github/workflows/README.md).

## Support

For issues or questions, contact Second Mile.

## License

Copyright (c) Second Mile
