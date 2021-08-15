/* eslint-disable */
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');
const resolve = require('path').resolve;
const TerserPlugin = require('terser-webpack-plugin');

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
      assets: resolve('./assets'),
      components: resolve('./src/components'),
      utils: resolve('./src/utils'),
    },
  },
  target: 'node',
  externals: {
    electron: 'commonjs2 electron',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              regex: /^.+(\..+)+$/
            },
          }
        },
      }),
    ],
  },
};
