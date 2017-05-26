// Created by Zerk on 25-May-17.

const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  SRC_DIR = path.resolve(__dirname, 'src'),
  BUILD_DIR = path.resolve(__dirname, 'build'),
  NODE_MODULES = path.resolve(__dirname, 'node_modules'),
  isProd = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].bundle.js'
    // publicPath: '/assets/'
  },
  module: {
    rules: [
      // js
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      // sass
      {
        test: /\.scss$/,
        include: SRC_DIR,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'postcss-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ]
        })),
      },
      // html
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      // multiple html excluding index.html
      {
        test: /\.html$/,
        exclude: path.resolve(__dirname, 'src/index.html'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },
      // images
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: SRC_DIR,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'img/',
              limit: 10000
            }
          },
          {
            loader: 'img-loader'
          }
        ]
      },
      // fonts
      {
        test: /\.(otf|ttf|eot|woff|woff2)$/,
        include: SRC_DIR,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.scss'],
    modules: [SRC_DIR, NODE_MODULES],
  },
  plugins: [
    new webpack.ProvidePlugin({
      // React: 'react',
      // ReactDOM: 'react-dom'
      // $: 'jQuery',
      // '_': 'lodash'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
      disable: false
    }),
    new CleanWebpackPlugin([
      'build'
    ]),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10,
      minChunkSize: 10000
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    // new webpack.optimize.CommonsChunkPlugin('vendors'),
  ]
};

if (!isProd) {
  config.devtool = 'source-map';
  config.devServer = {
    // contentBase: BUILD_DIR,
    hot: true,
    open: true,
    compress: true,
    stats: 'errors-only',
    port: 9000
  };
}

module.exports = config;
