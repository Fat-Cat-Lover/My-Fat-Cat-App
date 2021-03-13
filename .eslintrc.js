module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    "@typescript-eslint/no-unused-vars": "warn",
  }
};
