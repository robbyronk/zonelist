const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'js'),
  build: path.join(__dirname, 'build'),
};

const baseConfig = {
  entry: './js/application.js',
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'}),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          plugins: ['transform-decorators-legacy', "react-hot-loader/babel"],
          presets: ['react', 'es2015', 'stage-2', 'stage-0'],
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  }
};

const productionConfig = () => baseConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      // hotOnly: true, // uncomment to debug HMR, prevents a full refresh
      hot: true, // tries to hot reload, will fallback to full refresh
      historyApiFallback: true,
      stats: 'errors-only',
    },
    plugins: [
      new HtmlWebpackPlugin({template: './index.html'}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  };

  return Object.assign({}, baseConfig, config)
};

module.exports = (env) => {
  console.log('env', env);

  if (env === 'production') {
    return productionConfig();
  }

  return developmentConfig();
};