const getConfig = require('../webpack.config.js');
const webpackConfig = getConfig()
const cssRule = webpackConfig.module.rules[0]

// your app's webpack.config.js
// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../packages/**/*.stories.tsx'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules = [
      // replace mini-css-extract-plugin with style-loader
      {
        test: /\.css$/,
        use: ['style-loader', ...cssRule.use.slice(1)]
      },
      ...webpackConfig.module.rules.slice(1)
    ]
    config.resolve = webpackConfig.resolve
    return config
  },
  addons: [
    '@storybook/addon-actions/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-notes/register',
  ]
};