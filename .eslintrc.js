module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest"
  ],
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
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
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  overrides: [
    {
      files: ["*.test.jsx", "**/test-utils/*"],
      rules: { "import/no-extraneous-dependencies": "off" }
    }
  ],
  rules: {
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "import/prefer-default-export": "off",
    "react/button-has-type": "off"
  }
};
