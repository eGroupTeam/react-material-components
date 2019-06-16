const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.stories\.jsx?$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    alias: {
      '@e-group/material': path.resolve(__dirname, '../packages/material/src/'),
      '@e-group/material-form': path.resolve(__dirname, '../packages/material-form/src/'),
      '@e-group/material-lab': path.resolve(__dirname, '../packages/material-lab/src/'),
    }
  }
};
