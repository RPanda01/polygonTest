const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/polygonTest/',
        publicPath: '/',
        clean: true
    },
    devServer: {
        // static: {
        //     directory: path.join(__dirname, 'dist'),
        // },
        port: 8080,
    }
    ,
    //поменяй на 'production' для продакшн сборки
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
