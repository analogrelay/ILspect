const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const BUILTINS = ["electron"];

module.exports = {
    entry: path.join(__dirname, "src", "index.tsx"),
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"],
                }),
            },
            {
                test: /\.(woff|eot|svg|ttf)/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                    },
                }],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
    },
    externals: [
        function(context, request, callback) {
            if (BUILTINS.indexOf(request) >= 0) {
                return callback(null, `require(${request})`);
            }
            return callback();
        },
    ],
    plugins: [
        // new BundleAnalyzerPlugin({
        //     analyzerMode: "static"
        // }),
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: module => {
                return module.context && module.context.includes("node_modules");
            },
            name: "vendor",
        }),
        new ExtractTextWebpackPlugin("styles.[chunkhash].css"),
    ],
};
