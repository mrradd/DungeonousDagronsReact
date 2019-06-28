var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : './app/index.jsx',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        },
        {
          test: /\.css$/,
          use:[{loader:'style-loader'}, {loader: 'css-loader', options: { url: false }}]
        }
      ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ]

}