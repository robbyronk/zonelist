
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
var merge = require('webpack-merge');
const common = require('./webpack.config.js');

const devPath = 'http://localhost:8080/';

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  output: {
    publicPath: devPath
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "./static",
      to: path.resolve(__dirname, "../priv/static")
    }])
  ]
});
