module.exports = function(api) {
  if (api.env(['test'])) {
    return {
      // Use ts-jest to instead of @babel/preset-typescript
      // Read below article for why
      // https://kulshekhar.github.io/ts-jest/user/babel7-or-ts
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-transform-runtime'
      ]
    };
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // for browserslist in package.json
          useBuiltIns: 'entry',
          corejs: "3.0.0"
        }
      ],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        '@babel/plugin-transform-runtime',
        {
          useESModules: true
        }
      ]
    ],
    ignore: [
      "**/*.test.js",
      "**/*.test.jsx",
      "**/*.test.ts",
      "**/*.test.tsx"
    ]
  };
};
