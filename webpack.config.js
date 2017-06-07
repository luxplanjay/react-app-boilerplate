const {resolve} = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      SRC_DIR = resolve(__dirname, 'src'),
      BUILD_DIR = resolve(__dirname, 'build'),
      NODE_MODULES = resolve(__dirname, 'node_modules'),
      isProd = process.env.NODE_ENV === 'production';

const config = {
  context: SRC_DIR,
  entry: {
    main: './js/index.js'
  },
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].bundle.js',
    // publicPath: '/'
  },
  module: {
    rules: [
      // $js
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        use: [
          // {
          //   loader: 'react-hot-loader'
          // },
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', {modules: false}], 'react'],
              plugins: ['react-hot-loader/babel']
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
      // images
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
      // svg
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
      React: 'react',
      ReactDOM: 'react-dom',
      _: 'lodash'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      favicon: './img/favicon.png',
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
      name: 'common'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};

if (!isProd) {
  config.devtool = 'source-map';
  config.devServer = {
    hot: true,
    open: true,
    compress: true,
    stats: 'errors-only',
    port: 9000
  };
} else {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      comments: false
    })
  );
}

module.exports = config;
