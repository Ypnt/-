module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: { 'node/no-______-global': 'off' },
  plugins: ['prettier', 'node'],
};
