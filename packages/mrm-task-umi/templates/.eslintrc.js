module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.json',
  }
};
