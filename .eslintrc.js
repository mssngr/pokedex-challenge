module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/member-delimiter-style': [
      'error', 
      {
        multiline: { delimiter: none, requireLast: false },
        singleline: { delimiter: semi, requireLast: false },
      },
      {
        'no-restricted-globals': ['off', 'confirm'],
        'no-restricted-globals:0'
      }
    ],
    '@typescript-eslint/camelcase': 0,
  },
}
