import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments';

export default tseslint.config(
  { ignores: ['**/*.js', 'dist/**', 'lib/**'] },
  { linterOptions: { reportUnusedDisableDirectives: 'off' } },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  unicornPlugin.configs['flat/recommended'],
  promisePlugin.configs['flat/recommended'],

  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2019,
        sourceType: 'module',
      },
    },
    plugins: {
      import: importPlugin,
      '@eslint-community/eslint-comments': eslintComments,
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
    rules: {
      ...eslintComments.configs.recommended.rules,

      // --- unicorn rules not enforced in the original codebase ---
      'unicorn/filename-case': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-process-exit': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/switch-case-braces': 'off',
      'unicorn/escape-case': 'off',
      'unicorn/prefer-number-properties': 'off',
      'unicorn/no-typeof-undefined': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/prefer-optional-catch-binding': 'off',
      'unicorn/import-style': 'off',
      'unicorn/no-useless-spread': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/no-object-as-default-parameter': 'off',
      'unicorn/text-encoding-identifier-case': 'off',
      'unicorn/prefer-export-from': 'off',

      // --- general ---
      'no-prototype-builtins': 'off',
      'import/prefer-default-export': 'off',
      'import/no-default-export': 'error',
      'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.ts'] }],
      'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

      // --- typescript ---
      '@typescript-eslint/no-explicit-any': 'off',
      // allow unused vars in catch clauses (original codebase pattern)
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
          typedefs: true,
        },
      ],
    },
  },

  eslintConfigPrettier,

  {
    files: ['src/tests/**/*'],
    plugins: { jest: jestPlugin },
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      // tests use require() for jest module mocking
      'unicorn/prefer-module': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      // existing test patterns
      'jest/no-conditional-expect': 'off',
      'jest/no-alias-methods': 'off',
      'global-require': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-throw-literal': 'off',
    },
  },
);
