'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
const configsPath = 'config/webpack';
const TARGET = process.env.npm_lifecycle_event;

let env;
switch (TARGET) {
  case 'build':
    env = 'production';
    break
  default:
    env = 'development';
    break
}
let config = require(path.join(__dirname, configsPath, env));

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
  js: path.join(__dirname, 'src/js')
};

process.env.BABEL_ENV = TARGET;

module.exports = merge.smart({
  context: PATHS.src,
  entry: {
    src: ['index']
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'js/bundle.[hash:8].js',
    chunkFilename: 'js/chunk_[name].[chunkhash:6].js'
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loaders: ['eslint'],
    //     exclude: 'node_modules/*',
    //     include: PATHS.src
    //   }
    // ],
    loaders: [
      // {
      //   test: /\.css$/, loader: ExtractTextPlugin.extract({
      //     fallbackLoader: "style-loader",
      //     loader: "css-loader"
      //   })
      // },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'file'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css', 'sass'])
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.src
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: 'node_modules/*'
      // }
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      'window.jQuery': 'jquery'
    }),

    new HtmlPlugin({
      template: 'index.html'
    }),

    new ExtractTextPlugin("style/[name]-[hash:6].css", {allChunks: true})
  ],

  resolve: {
    modulesDirectories: ['node_modules', PATHS.src, PATHS.js],
    extensions: ['', '.js', '.jsx']
  }
},
config(__dirname));
