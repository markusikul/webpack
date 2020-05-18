const path =require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} =require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports={
    context:  path.resolve(__dirname, 'src'),
    mode: 'development',   //  удалить для минифакации
    entry: './index.js',
    output:{
        filename : 'app.[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new HTMLWebpackPlugin({
            title:'test',
            template:'./index.html',
            minify:{
                collapseWhitespace: true
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.[cintenthash].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, 'dist/img')
                }
            ]
        })
    ],
    module:{
        rules:[
            {
                // test: /\.s[ac]ss$/i,
                // use: [
                //     // Creates `style` nodes from JS strings
                //     'style-loader',
                //     // Translates CSS into CommonJS
                //     'css-loader',
                //     {
                //         loader: 'sass-loader',
                //         options: {
                //             sassOptions: {
                //                 indentWidth: 4,
                //                 includePaths: ['.src/sass/style.sass', '.dist/']
                //             },
                //         },
                //     }
                // ]
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.sass$/,
                use: [
                   // 'style-loader',
                    {
                       loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader' // compiles Sass to CSS
                }]
            },

        ]
    },
    devServer:{
        port:4200
    }

}