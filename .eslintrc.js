module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'max-len': [1, 80, 2, { ignoreComments: false }],
    'quote-props': [1, 'consistent-as-needed'],
    'no-unused-vars': ['warn'],
    radix: 0,
    'func-names': ['error', 'never'],
    'linebreak-style': ['error', 'windows'], // change "windows" for "unix" if your are on Mac
    'no-console': 0,
    // 'global-require': 'error'
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },
  globals: {}
};
