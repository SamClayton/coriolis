const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'source-map',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  mode: 'development',
  optimization: {
    minimize: false,
  },
  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
