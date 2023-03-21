const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/index.js',
        output: {
            filename: isDevelopment ? 'bundle.js' : 'bundle.min.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                }),
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                appMountId: "app",
                filename: "index.html",
                template: "src/index.html"
            }),
        ],
        devServer: {
            port: 3000
        }
    };
};
