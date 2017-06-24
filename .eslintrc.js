module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "globals": {
    "_": true
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
  ]
};
