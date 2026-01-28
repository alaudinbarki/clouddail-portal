# Installation Instructions

## Testing Dependencies Issue

The testing dependencies have peer dependency conflicts with Material-UI. To install them, use the `--legacy-peer-deps` flag:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui jsdom --legacy-peer-deps
```

## Why --legacy-peer-deps?

Material-UI v7 and some testing libraries have conflicting peer dependencies. Using `--legacy-peer-deps` allows npm to install the packages despite these conflicts. This is safe for development dependencies.

## After Installation

Once the testing dependencies are installed, you can:

1. Remove the `@ts-nocheck` and `/* eslint-disable */` comments from test files
2. Run tests with `npm test`
3. View test UI with `npm run test:ui`
4. Generate coverage with `npm run test:coverage`

## Alternative: Skip Testing Setup

If you don't need testing immediately, you can:

1. Delete the test files:
   - `src/features/auth/__tests__/Login.test.tsx`
   - `src/services/__tests__/userService.test.ts`
   - `src/setupTests.ts`
   - `vitest.config.ts`

2. Remove test scripts from `package.json`

3. Continue with UI development or backend integration
