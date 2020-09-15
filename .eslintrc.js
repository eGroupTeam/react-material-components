module.exports = {
  plugins: [
    "@typescript-eslint",
    "jest"
  ],
  env: {
    browser: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    "import/resolver": {
      typescript: {}
    },
  },
  overrides: [
    {
      files: ["*.test.*", "**/test-utils/*"],
      rules: { "import/no-extraneous-dependencies": "off" }
    }
  ],
  rules: {
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "import/prefer-default-export": "off",
    "react/button-has-type": "off",
    "jsx-a11y/media-has-caption": "off",
    "react/jsx-no-duplicate-props": ["error", { ignoreCase: false }],
    "no-plusplus": "off",
    "radix": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // TODO: We should reopen this rule after all component refactor to ts.
    "@typescript-eslint/ban-ts-comment": "off",
  }
};
