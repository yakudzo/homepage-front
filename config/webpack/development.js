'use strict';

module.exports = () => ({
  // watch: true,
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 8050,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
});
