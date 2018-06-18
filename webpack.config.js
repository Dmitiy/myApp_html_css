'use strict';
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // context: path.resolve(__dirname, 'src'),

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'assets/js/index.js',
        // publicPath: 'assets/'
    },

    devtool: 'eval-source-map',

    devServer : {
        overlay: true
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json', '.html', '.pug', '.css', '.scss'],
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            // {
            //     test: /\.html$/,
            //     use: ['html-loader']
            // },
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //         }
            //     }],
            //     // exclude: path.resolve(__dirname, 'src/views/index.pug')
            //     exclude: path.resolve(__dirname, 'src/index.html')
            // },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
               test: /\.(css|scss)$/,
               use: ExtractTextPlugin.extract({
                   use: ['css-loader', 'sass-loader']
               })
            },
            {
               test: /\.(jpg|png|jpeg|gif)$/,
               use: [{
                   loader: 'file-loader',
                   options: {
                       limit: 10240,
                       name: '[name].[ext]',
                       outputPath: 'img/',
                       publicPath: '../'
                   }
               }]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg|otf)$/,
                use: [{
                    loader: 'url-loader',
                    query: {
                       limit: 10240,
                       name: '[name].[ext]',
                       outputPath: 'fonts/',
                       publicPath: '../'
                   }
               }]
            },
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     Popper: ['popper.js', 'default'],
        //     // In case you imported plugins individually, you must also require them here:
        //     Util: "exports-loader?Util!bootstrap/js/dist/util",
        //     Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
        // }),
        new ExtractTextPlugin("assets/css/style.css"),
        // new HtmlWebpackPlugin(),
        new HtmlWebpackPlugin({
            // filename: './index.html',
            template: './index1.html'
        }),
        // new HtmlWebpackPlugin({
        //     filename: '../index.html',
        //     template: './src/views/index.pug'
        // }),
    ]
};