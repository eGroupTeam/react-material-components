module.exports = function(api) {
  const isTest = api.env(['test']);

  if (isTest) {
    return {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      env: {
        test: {
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    };
  }

  const presets = [
    [
      '@babel/preset-env',
      {
        // for browserslist in package.json
        useBuiltIns: 'entry',
        // use ES6 module
        modules: false
      }
    ],
    '@babel/preset-react'
  ];

  const plugins = [
    // loose模式說明 https://www.w3ctech.com/topic/1708
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ],
    '@babel/plugin-syntax-dynamic-import',
    // A plugin that enables the re-use of Babel's injected helper code to save on codesize.
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true
      }
    ]
  ];

  const env = {
    test: {
      plugins: ['require-context-hook']
    }
  };

  return { presets, plugins, env };
};
