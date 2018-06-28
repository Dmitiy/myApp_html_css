const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const CleanWebpackPlugin  = require('clean-webpack-plugin');
const cleanPlugin = new CleanWebpackPlugin(['public']);

const isProduction = (process.env.NODE_ENV === 'production');

const extractPlugin = new ExtractTextPlugin({
    filename: 'assets/css/[name].css'
});

module.exports = {

    entry: {
        app: [
            './src/index.js',
            './src/assets/scss/style.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name]',
        // publicPath: '/'
    },
    node: {
        fs: 'empty',
        dns: 'empty',
        net: 'empty',
        tls: 'empty',
        path: true,
        url: false
    },
    devServer : {
        contentBase : './public',
        overlay: {
            warnings: true,
            errors: true
        }
    },
    devtool: (isProduction) ? '' : 'inline-source-map',

    resolveLoader: {
        moduleExtensions: [ '-loader' ]
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: "pug-loader",
                options: {
                    pretty: true
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true }
                        },
                        { 
                            loader: 'sass-loader',
                            options: { sourceMap: true },
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test : /\.(png|gif|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img/',
                            publicPath: '../img/'
                        },
                    },
                    'img-loader',
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=assets/fonts/[name].[ext]'
            }
            // Font Definitions
            // { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]' },
            // { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]' },
            // { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]' },
            // { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]' },
            // { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]' }
        ]
    },
    resolve: {
        extensions: [ '.js', '.jsx', '.json', '.html', '.pug', '.scss', '.css']
    },
    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: 'exports-loader?Util!bootstrap/js/dist/util',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
        }),

        new CopyWebpackPlugin(
            [{
                from : 'src/assets/img',
                to: 'assets/img/'
            }],
            {
                ignore : [
                    {
                        glob: 'svg/*'
                    }
                ]
            }
        ),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pug/index.pug'
        }),

        extractPlugin,
        cleanPlugin,
    ]
};

if (isProduction) {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap : true  
        }),
    );
    module.exports.plugins.push(
        new ImageminPlugin({
            test : /\.(png|jpe?g|gif|svg)$/i
        }),
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
    );
}