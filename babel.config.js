module.exports = function(api) {
  if (api.env(['test'])) {
    return {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-proposal-class-properties']
    };
  }

  return {
    presets: [
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
    ],
    plugins: [
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
    ]
  };
};
