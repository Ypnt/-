const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin=require("mini-css-extract-plugin")
module.exports = {
  entry: './src/index.js',
  output: {
    clean:true,
    filename: '[name].[contenthash:5].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test:/\.tsx?$/,
        use:{
            loader: 'babel-loader',
            Option:{
                presets:['@babel/preset-env'],
            }
        },
        exclude:["/node_modules/"],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin(
        {
            filename:'[name].[contenthash:5].css',
        }
    )
],
};