const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  context: SRC_DIR,
  entry: {
    app: [
      'babel-polyfill',
      './index.jsx',
    ],
  },
  output: {
    path: DIST_DIR,
    filename: '[name].[chunkhash].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: { fix: true, cache: true },
          },
        ],
      },
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.scss$/,
        include: SRC_DIR,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        include: SRC_DIR,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[chunkhash].[ext]',
              outputPath: 'img/',
              limit: 10000,
            },
          },
          'img-loader',
        ],
      },
      {
        test: /\.svg$/i,
        include: SRC_DIR,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[chunkhash].[ext]',
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
    new ExtractTextPlugin({
      filename: 'styles.[chunkhash].css',
      allChunks: true,
      disable: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      comments: false,
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: m => m.context &&
        m.context.includes('node_modules'),
    }),
  ],
};
