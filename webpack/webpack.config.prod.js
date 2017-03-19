const path = require('path');
const webpack = require('webpack');

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  comments: false,
  drop_console: true
});

module.exports = {
  devtool: 'cheap-source-map',
  entry: require('./common/entry.js'),
  output: {
    path: path.resolve('public/dist'),
    filename: 'bundle.js',
    publicPath : '/'
  },
  module: {
    loaders: require('./common/loaders.js'),
    rules: require('./common/rules.js')
  },
  plugins: require('./common/plugins.js').concat(
    [
      UglifyJsPluginConfig
    ]
  )
}
