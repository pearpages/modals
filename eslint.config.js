import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  { ignores: ['dist', 'playground/dist', '**/node_modules'] },
  {
    files: ['src/**/*.{ts,tsx}', 'playground/src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    // Every file under examples/ is shown to readers verbatim via ?raw, so it has
    // to stand on its own: what is on screen must be pasteable into a consumer's
    // project. Relative imports and stylesheets would not survive the paste.
    files: ['playground/src/examples/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['./*', '../*', '@/*'],
            message: 'Examples must be self-contained: import only from react and @pearpages/modals.',
          },
          {
            group: ['*.scss', '*.css'],
            message: 'Examples must not import stylesheets — the snippet is shown verbatim to users.',
          },
        ],
      }],
    },
  },
])
