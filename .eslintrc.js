module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "func-names": ["error", "never"],
    "linebreak-style": [
      "error",
      "unix"
    ],
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
