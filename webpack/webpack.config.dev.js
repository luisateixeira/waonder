const path = require('path');
const webpack = require('webpack');

const DashboardPlugin = require('webpack-dashboard/plugin');
const DashboardPluginConfig = new DashboardPlugin();

// enable HMR globally
const HotModuleReplacementPluginConfig = new webpack.HotModuleReplacementPlugin();

// prints more readable module names in the browser console on HMR updates
const NamedModulesPluginConfig = new webpack.NamedModulesPlugin();

module.exports = {
  devtool: 'eval',
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:8000',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server'
  ].concat(require('./common/entry.js')),

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath : '/'
  },

  module: {
    loaders: require('./common/loaders.js')
  },

  plugins: require('./common/plugins.js').concat(
    [
      DashboardPluginConfig,
      HotModuleReplacementPluginConfig,
      NamedModulesPluginConfig
    ]
  ),

  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    port: 8000,
    hot: true
  }
}
