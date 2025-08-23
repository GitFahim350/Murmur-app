const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.tsx',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
    },
    resolve: { extensions: ['.ts', '.tsx', '.js'] },
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
        ],
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        static: { directory: path.join(__dirname, 'public') },
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
};
