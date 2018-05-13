
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
var merge = require('webpack-merge');
const common = require('./webpack.config.js');

const prodPath = 'https://app.zonefocus.xyz/';


module.exports = merge(common, {
  devtool: 'source-map',
  output: {
    publicPath: prodPath
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "./static",
      to: path.resolve(__dirname, "../priv/static")
    }]),

    new ExtractTextPlugin({
      filename: "css/[name].css",
      allChunks: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      extractComments: false,
      compress: {
        warnings: false,
        drop_console: true
      },
      mangle: {
        except: ['$'],
        screw_ie8: true,
        keep_fnames: true,
      }
    })
  ]

});
