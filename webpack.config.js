const {resolve} = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      SRC_DIR = resolve(__dirname, 'src'),
      BUILD_DIR = resolve(__dirname, 'build'),
      NODE_MODULES = resolve(__dirname, 'node_modules');

module.exports = {
  context: SRC_DIR,
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:9000',
      'webpack/hot/only-dev-server',
      './index.js'
    ],
    vendor: ['lodash']
  },
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', {modules: false}], 'react'],
              plugins: ['react-hot-loader/babel']
            }
          }
        ]
      },
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
      {
        test: /\.(jpe?g|png|gif)$/i,
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
      {
        test: /\.svg$/i,
        include: SRC_DIR,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]?[hash]',
              outputPath: 'img/'
            }
          },
          {
            loader: 'img-loader',
            options: {
              svgo: {
                plugins: [
                  {removeTitle: true},
                  {cleanupIDs: false},
                  {convertPathData: false}
                ]
              }
            }
          }
        ]
      },
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
    extensions: ['.js', '.jsx', '.scss'],
    modules: [SRC_DIR, NODE_MODULES],
  },
  plugins: [
    new webpack.ProvidePlugin({}),
    new HtmlWebpackPlugin({
      title: 'Placeholder',
      filename: 'index.html',
      template: 'index.ejs',
      favicon: 'img/favicon.png',
      inject: true,
      hash: true
    }),
    new ExtractTextPlugin({
      filename: 'css/styles.css',
      allChunks: true,
      disable: false
    }),
    new CleanWebpackPlugin(['build']),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10,
      minChunkSize: 10000
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: BUILD_DIR,
    publicPath: '/',
    hot: true,
    open: true,
    compress: true,
    port: 9000,
    historyApiFallback: true,
    stats: 'errors-only',
    clientLogLevel: 'error'
  }
};
