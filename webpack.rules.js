module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@vercel/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.svgz?$/,
    type: 'asset/inline'
  },
  {
    test: /\.txt$/,
    type: 'asset/source'
  },
  {
    test: /\.json$/,
    type: 'asset/inline',
    generator: {
      dataUrl: content => {
        return JSON.parse(content);
      }
    }
  }
];
