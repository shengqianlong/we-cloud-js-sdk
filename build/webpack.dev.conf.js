const webpack = require("webpack");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const base = require("./webpack.base.conf");

module.exports = merge(base, {
    entry: "./examples/index.js",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: "./examples/index.html",
            inject: true,
        }),
    ],
    devtool: "cheap-module-eval-source-map",
    devServer: {
        disableHostCheck: true,
        clientLogLevel: "warning",
        publicPath: "/",
        historyApiFallback: true,
        hot: true,
        proxy: {
            "/api/*": {
                target: "http://192.168.1.205:8080",
                changeOrigin: true,
                secure: false,
            },
        },
        host: "192.168.1.205",
        contentBase: false,
        compress: true,
        overlay: { warnings: false, errors: true },
        quiet: true,
        watchOptions: {
            poll: true,
        },
    },
});
