const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { InjectManifest } = require('workbox-webpack-plugin');
// TODO: Remove these if nobody is not monitoring Bugsnag for the project. Instantiation was already commented out below.
// const { BugsnagSourceMapUploaderPlugin, BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins');

module.exports = merge(common, {
  // devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimize: true,
  },
  output: {
    globalObject: 'this'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/schemas', to: 'schemas' },
      {
        from: 'src/images/logo/*',
        flatten: true,
        to: ''
      }, 
    ]),
    /* new HtmlWebpackPlugin({
      // uaTracking: process.env.CORIOLIS_UA_TRACKING || '',
    }), */
    new MiniCssExtractPlugin({
      filename: '[hash:6].css',
    }),
    // new BugsnagBuildReporterPlugin({
    //   apiKey: 'ba9fae819372850fb660755341fa6ef5',
    //   appVersion: `${pkgJson.version}-${buildDate.toISOString()}`
    // }, { /* opts */ }),
    // new BugsnagSourceMapUploaderPlugin({
    //   apiKey: 'ba9fae819372850fb660755341fa6ef5',
    //   overwrite: true,
    //   appVersion: `${pkgJson.version}-${buildDate.toISOString()}`
    // }),
    new InjectManifest({
      swSrc: './src/sw.js',
      //importWorkboxFrom: 'cdn',
      swDest: 'service-worker.js'
    }),
  ]
});
