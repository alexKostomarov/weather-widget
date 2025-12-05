import path from 'path';
import { fileURLToPath } from 'url';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        devtool: isDev ? 'eval-source-map' : 'source-map',
        entry: './src/main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDev ? 'bundle.js' : 'weather-widget.js',
            library: 'WeatherWidgetBundle',
            libraryTarget: 'umd',
            clean: true,
        },
        resolve: {
            extensions: ['.js', '.ts', '.vue'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        module: {
            rules: [
                { test: /\.vue$/, loader: 'vue-loader' },
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: { appendTsSuffixTo: [/\.vue$/] }
                        }
                    ],
                    exclude: /node_modules/
                },

                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                },
                {
                    test: /\.css$/,
                    oneOf: [
                        {
                            resourceQuery: /inline/,
                            use: [
                                {
                                    loader: 'raw-loader', // превращает CSS в строку
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        postcssOptions: {
                                            plugins: [tailwindcss, autoprefixer],
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            use: ['style-loader', 'css-loader', 'postcss-loader'],
                        },
                    ],
                }


            ],
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                inject: isDev,
            }),
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: JSON.stringify(true),
                __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src/locales/*.json'),
                        to: path.resolve(__dirname, 'dist/locales/[name][ext]'),
                    },
                ],
            }),
        ],
        devServer: {
            hot: true,
            port: 3000,
        },
    };
};
