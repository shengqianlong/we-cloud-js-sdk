const path = require('path');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '../'),
    output: {
        path: path.join(__dirname, '../dist/'),
        publicPath: '/',
        filename: 'Wecloud.min.js',
        library: 'Wecloud',
        libraryTarget: 'umd',
        globalObject: 'this',
        // libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
