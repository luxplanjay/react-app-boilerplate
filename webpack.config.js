var webpack = require('webpack'),
    path = require('path'),
    SRC_DIR = path.resolve(__dirname, 'src'),
    DIST_DIR = path.resolve(__dirname, 'dist'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    context: SRC_DIR,
    entry: './js/main.js',
    output: {
        path: DIST_DIR + '/app',
        filename: 'scripts.js',
        publicPath: 'app/'
    },
    devServer: {
        inline: true,
        port: 3000
    },
    devtool: 'source-map',
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
                    use: 'css-loader?sourceMap!sass-loader?sourceMap'
                })
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|otf|ttf|eot|woff)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
            'ReactDOM': 'react-dom'
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]
};

module.exports = config;