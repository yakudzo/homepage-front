'use strict';

module.exports = () => ({
  // watch: true,
  devtool: 'source-map',
  devServer: {
    // contentBase: path.resolve(__dirname, '/backend'),
    host: 'localhost',
    port: 8050,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      "/api/*": "http://dev.cake.dev"
    }
  }
});
