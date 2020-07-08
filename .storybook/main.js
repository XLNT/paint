module.exports = {
  stories: ['../src/**/*.stories.(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions',
    '@storybook/addon-links'
  ],
  webpackFinal: (config) => {
    config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      })

    return config;
  }
};
