const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    enforce: "pre",
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader',
    options: {limit: 25000}
  },
  {
    test: /\.(js)$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.scss$/,
    loaders: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: ["node_modules/normalize-scss/sass"]
                    }
                }]
            })
  },
];
