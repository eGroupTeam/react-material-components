const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../stories/**/*.stories.@(tsx|ts|jsx|js|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-knobs/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          enforce: 'pre'
        },
      },
    },
    '@storybook/addon-actions/register'
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.alias = {
      '@e-group/material': path.resolve(__dirname, '../packages/material/src/'),
      '@e-group/material-form': path.resolve(__dirname, '../packages/material-form/src/'),
      '@e-group/material-icons': path.resolve(__dirname, '../packages/material-icons/src/'),
      '@e-group/material-lab': path.resolve(__dirname, '../packages/material-lab/src/'),
      '@e-group/material-layout': path.resolve(__dirname, '../packages/material-layout/src/'),
      '@e-group/material-module': path.resolve(__dirname, '../packages/material-module/src/'),
    };

    // Return the altered config
    return config;
  },
};