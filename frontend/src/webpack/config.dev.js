const path = require('path');
const webpack = require('webpack');
const AsyncAwaitPlugin = require('webpack-async-await') ;


console.log(__dirname);
module.exports = {
  entry: './es/index',
  output: {
    path: './built',
    publicPath: 'js',
    filename: 'built.js'
  },
  plugins: [
    new AsyncAwaitPlugin({}),
    new webpack.ProvidePlugin({
      PDFJS: 'pdfjs-dist',
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
      }
    ]
  }
};

var es = {
  rules: [
  ],
}