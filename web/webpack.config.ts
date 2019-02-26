import path from "path";
import webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";
import CleanWebPackPlugin from "clean-webpack-plugin";

const config: webpack.Configuration = {
    mode: "development",
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    output: {
        filename: "main.[hash].js",
        path: path.resolve(__dirname, "./dist"),
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            inject: "body",
        }),
        new CleanWebPackPlugin("./dist"),
    ],
};

export default config;