const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../stories/**/*.stories.@(tsx|ts|jsx|js|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
  ],
  typescript: {
    check: true
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.alias = {
      '@e-group/material': path.resolve(__dirname, '../packages/material/src/'),
      '@e-group/material-form': path.resolve(__dirname, '../packages/material-form/src/'),
      '@e-group/material-formik': path.resolve(__dirname, '../packages/material-formik/src/'),
      '@e-group/material-icons': path.resolve(__dirname, '../packages/material-icons/src/'),
      '@e-group/material-lab': path.resolve(__dirname, '../packages/material-lab/src/'),
      '@e-group/material-layout': path.resolve(__dirname, '../packages/material-layout/src/'),
      '@e-group/material-module': path.resolve(__dirname, '../packages/material-module/src/'),
      '@e-group/devops': path.resolve(__dirname, '../packages/devops/src/'),
      '@e-group/hooks': path.resolve(__dirname, '../packages/hooks/src/'),
      '@e-group/testing-utils': path.resolve(__dirname, '../packages/testing-utils/src/'),
      '@e-group/utils': path.resolve(__dirname, '../packages/utils/src/'),
      '@e-group/redux-modules': path.resolve(__dirname, '../packages/redux-modules/src/')
    };

    // Return the altered config
    return config;
  },
};