const isProductionMode = process.env.NODE_ENV === "production";
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const loader = require('sass-loader');


let mode = "development";
let target = 'web';
if (process.env.NODE_ENV === "production") {
    mode = 'production';
    target = 'browserslist';
}

module.exports = {
    mode: mode,
    target: target,
    entry: {
        // index: { 
        //     import: './src/js/index.js', filename: 'js/[name][contenthash].js',
        // },
        // print: {
        //     import: './src/js/print.js', filename: 'js/[name][contenthash].js',
        // },
        main: {
            import: './src/js/main.js',
        },
    },

    devtool: isProductionMode ? false : 'inline-source-map',  //eval-source-map
    devServer: {
        port: 8000,
        contentBase: './dist',
        hot: true,
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            // minify: false,
        }),
        new HtmlWebpackPugPlugin({

        }),
        new MiniCssExtractPlugin({
            linkType: false,
            filename: isProductionMode ? "style/[name][contenthash].css" : "style.css",
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/images", to: "images" },
                { from: "./src/font", to: "font" },

                //         // { from: './src/docs', to: 'docs'},
                //         // { from: './src/php', to: 'php'},
                //         // // { from: "other", to: "public" },
            ],
        }),
        new CleanWebpackPlugin(),

    ],
    resolve: {
        extensions: [".js", ".jsx"],
    },
    output: {
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true,
    },

    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isProductionMode ? {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            //publicPath: path.resolve('dist/style'),
                        }
                    } : 'style-loader',
                    'css-loader', 'postcss-loader',
                    "sass-loader"
                ],
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(svg|jpg|webp|jpeg|mp4|mp3)$/i,
                type: 'asset',
            },
            {
                test: /\.(gif)$/i,
                type: 'asset/inline',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|doc|docx|rtf|svg|png)$/i,
                type: 'asset/inline',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
        ],

    },
    optimization: {
        // runtimeChunk: "single",
        minimize: isProductionMode ? true : false,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin(),

        ],
    },
};
