module.exports = {
  "extends": "airbnb",
  "rules": {
    "max-len": [1, 100, 2, {ignoreComments: true}],
    "quote-props": [1, "consistent-as-needed"],
    "no-unused-vars": [2, {"args": "none"}],
    "radix": 0,
    "func-names": ["error", "never"],
    "linebreak-style": [
      "error",
      "unix"
    ],
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "globals": {
    "_": true
  },
};
