const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('./webpack.config.js');
const options = {
  contentBase: './dist',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: false,
  quiet: false,
  stats: 'errors-only',
  clientLogLevel: 'warning',
  compress: true,
  port: 9000
};

const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(9000, () => {
  console.log('Dev server listening at http://localhost:9000/');
});
