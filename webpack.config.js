var webpack = require('webpack'),
    path = require('path'),
    SRC_DIR = path.resolve(__dirname, 'src'),
    DIST_DIR = path.resolve(__dirname, 'dist'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    context: SRC_DIR,
    entry: {
        main: './main.js'
    },
    output: {
        path: DIST_DIR + '/app',
        filename: '[name].bundle.js',
        publicPath: 'app/',
        library: 'app'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: SRC_DIR,
                loader: 'babel-loader',
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },
            {
                test: /\.scss$/,
                include: SRC_DIR,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap!postcss-loader!resolve-url-loader!sass-loader?sourceMap'
                })
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|otf|ttf|eot|woff|woff2)$/,
                include: /\/node_modules\//,
                loader: 'file-loader?name=[1].[ext]&regExp=node_modules/(.*)'
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|otf|ttf|eot|woff|woff2)$/,
                exclude: /\/node_modules\//,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors'),
        new webpack.ProvidePlugin({
            "React": "react",
            'ReactDOM': 'react-dom'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({filename: 'css/style.css', allChunks: true}),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        inline: true,
        port: 3000
    },
    watchOptions: {
        aggregateTimeout: 100
    }
};

module.exports = config;