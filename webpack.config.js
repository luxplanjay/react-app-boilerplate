const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'eval-source-map',
  context: SRC_DIR,
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './index.jsx',
  ],
  output: {
    path: DIST_DIR,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: { fix: true, cache: true },
          },
        ],
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        include: SRC_DIR,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        include: SRC_DIR,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash:5]',
              outputPath: 'img/',
              limit: 10000,
            },
          },
          { loader: 'img-loader' },
        ],
      },
      {
        test: /\.svg$/i,
        include: SRC_DIR,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash:5]',
              outputPath: 'img/',
            },
          },
          {
            loader: 'img-loader',
            options: {
              svgo: {
                plugins: [
                  { removeTitle: true },
                  { cleanupIDs: false },
                  { convertPathData: false },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(otf|ttf|eot)(\?[a-z0-9#=&.]+)?$/,
        include: SRC_DIR,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [SRC_DIR, 'node_modules'],
    alias: {
      '@': SRC_DIR,
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.ejs',
      favicon: 'favicon.png',
      inject: true,
      hash: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
    }),
  ],
  devServer: {
    contentBase: DIST_DIR,
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    noInfo: false,
    quiet: false,
    stats: 'errors-only',
    clientLogLevel: 'warning',
    compress: true,
    port: 9000,
  },
};
