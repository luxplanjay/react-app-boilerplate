module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "max-len": [1, 100, 2, { ignoreComments: true }],
    "quote-props": [1, "consistent-as-needed"],
    // "no-unused-vars": [2, {"args": "none"}],
    'no-unused-vars': ['warn'],
    "radix": 0,
    "func-names": ["error", "never"],
    "linebreak-style": [ "error", "windows" ], // change "windows" for "unix" if your are on Mac
    'no-console': 0,
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "webpack.config.js"
      }
    }
  },
  "globals": {},
};
