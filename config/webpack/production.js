'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const base = path.join(__dirname, '../../');
const PATHS = {
  root: base,
  build: path.join(base, 'dist'),
};

module.exports = () => ({
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: PATHS.root,
      verbose: true,
      dry: false
    })
  ]
});
