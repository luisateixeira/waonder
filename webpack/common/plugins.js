const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  favicon: './src/favicon.png',
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'dist/styles/[name].css',
  allChunks: true
});

module.exports = [
  HtmlWebpackPluginConfig,
  ExtractTextPluginConfig
]
