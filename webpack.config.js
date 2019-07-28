const path = require('path');
var webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: process.env.NODE_ENV,
    entry: './src/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    output: {
        path: path.join(__dirname, '/docs'),
        filename: 'js/bundle.min.js',
        chunkFilename: 'js/vendor.bundle.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, '../docs'),
        port: 3000,
        disableHostCheck: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                exclude: /src/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                exclude: /src/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                    'image-webpack-loader'
                ]
            },
            { test: /\.(woff|woff2|eot|ttf)$/, use: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            path: path.resolve(__dirname, '/docs'),
            filename: "css/index.css",
            chunkFilename: "css/vendor.css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
        })
    ]
}