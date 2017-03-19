var webpack = require('webpack'),
    path = require('path'),
    SRC_DIR = path.join(__dirname, 'src'),
    DIST_DIR = path.join(__dirname, 'dist'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    context: SRC_DIR,
    entry: {
        main: './index.js',
    },
    output: {
        path: DIST_DIR,
        publicPath: '/',
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: SRC_DIR,
                use: [
                    {
                        loader: 'react-hot-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["react", "es2015", "stage-2"]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                include: SRC_DIR,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap!resolve-url-loader!postcss-loader!sass-loader?sourceMap'
                })
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|otf|ttf|eot|woff|woff2)$/,
                include: /\/node_modules\//,
                use: 'file-loader?name=[1].[ext]&regExp=node_modules/(.*)'
            },
            {
                test: /\.(otf|ttf|eot|woff|woff2)$/,
                exclude: /\/node_modules\//,
                use: 'file-loader?name=[path][name].[ext]'
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                exclude: /\/node_modules\//,
                use: 'url-loader?name=img/[name].[ext]&limit=8192!img-loader'
            },
            {
                test: /\.(handlebars|hbs)$/,
                exclude: /\/node_modules\//,
                use: "handlebars-loader?helperDirs[]=${clientHelpersPath}"
            }
        ]
    },
    resolve: {
        extensions: ['.js', ".json", ".jsx", ".scss"],
        modules: [path.resolve(__dirname, "src"), path.resolve(__dirname, 'node_modules')]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/style.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            // title: 'My App',
            filename: 'index.html',
            template: './index.html',
            inject: false
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map',
    devServer: {
        inline: true,
        port: 9000,
        contentBase: SRC_DIR,
        open: true,
        historyApiFallback: true
    },
    watchOptions: {
        aggregateTimeout: 100
    }
};

// process.traceDeprecation = true;

module.exports = config;