const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: 'defaults',
              }],
              '@babel/preset-react',
            ],
          },
        }],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new BundleTracker({ filename: 'webpack-stats.dev.json' }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BASE_URL: JSON.stringify('http://0.0.0.0:8000/'),
      },
    }),
  ],
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  entry: {
    main: [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      path.join(__dirname, 'src/index'),
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: {
    path: path.join(__dirname, 'builds'),
    filename: '[name]-[hash].js',
    publicPath: 'http://0.0.0.0:3000/builds',
  }
};
