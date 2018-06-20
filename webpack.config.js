
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
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    node: {
        fs: 'empty',
        dns: 'empty',
        net: 'empty',
        tls: 'empty',
        path: true,
        url: false
    },
    devServer : {
        contentBase : './public'
    },
    devtool: (isProduction) ? '' : 'inline-source-map',

    resolveLoader: {
        moduleExtensions: [ '-loader' ]
    },

    module: {
        rules: [
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
            }
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

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
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