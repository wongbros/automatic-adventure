module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "mocha": true,
  },
  "plugins": [
    "chai-friendly",
  ],
  "rules": {
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  },
};
