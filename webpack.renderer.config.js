/* eslint-disable */
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const resolve = require('path').resolve

rules.push({
  test: /\.s?[ca]ss$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.svg'],
    alias: {
      'assets': resolve('./assets'),
      'components': resolve('./src/components'),
    }
  },
  target: 'node',
};
