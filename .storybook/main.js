const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  addons: ['@storybook/preset-typescript'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre'
    });

    config.resolve.alias = {
      '@e-group/material': path.resolve(__dirname, '../packages/material/src/'),
      '@e-group/material-form': path.resolve(__dirname, '../packages/material-form/src/'),
      '@e-group/material-lab': path.resolve(__dirname, '../packages/material-lab/src/'),
      '@e-group/material-layout': path.resolve(__dirname, '../packages/material-layout/src/'),
      '@e-group/material-module': path.resolve(__dirname, '../packages/material-module/src/'),
    };

    // Return the altered config
    return config;
  },
};