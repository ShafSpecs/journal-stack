/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
      },
    ],
    strict: 'error',
    'sort-destructure-keys/sort-destructure-keys': 'error',
    'import/no-unresolved': [2, { caseSensitive: false }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
  extends: [
    "eslint:recommended",
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'plugin:prettier/recommended',
    'standard',
    'plugin:import/typescript',
    'plugin:import/errors'
  ],
  plugins: ['simple-import-sort', 'import', 'disable', 'sort-destructure-keys', 'node'],
  overrides: [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: ["react", "jsx-a11y"],
      extends: [
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      settings: {
        react: {
          version: "detect",
        },
        formComponents: ["Form"],
        linkComponents: [
          { name: "Link", linkAttribute: "to" },
          { name: "NavLink", linkAttribute: "to" },
        ],
      },
    },
    {
      files: ["**/*.{ts,tsx}"],
      plugins: ["import"],
      parser: "@typescript-eslint/parser",
      settings: {
        "import/internal-regex": "^~/",
        "import/resolver": {
          node: {
            extensions: [".ts", ".tsx"],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        "plugin:import/recommended",
        "plugin:import/typescript",
      ],
    },
    {
      files: [".eslintrc.js"],
      env: {
        node: true,
      },
    },
  ],
  ignorePatterns: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/build/**'],
};
