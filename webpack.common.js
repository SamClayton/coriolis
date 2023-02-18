const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const pkgJson = require('./package');
const buildDate = new Date();

module.exports = {
entry: {
    main: './src/app/index.js'
  },
  resolve: {
    // When requiring, you don't need to add these extensions
    extensions: ['.js', '.jsx', '.json', '.less'],
    fallback: {
      // Consider replacing brwoserify-zlib-next c. 2016 package with pako, which it's just a wrapper for
      "zlib": require.resolve("browserify-zlib-next"),
      "assert": require.resolve("assert/"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify")
    }
  },
  optimization: {
    usedExports: true
  },
  output: {
    path: path.join(__dirname, 'build'),
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CopyWebpackPlugin([
      'src/.htaccess', 
      'src/iframe.html', 
      'src/xdLocalStoragePostMessageApi.min.js'
    ]),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'lib',
    //   filename: 'lib.js'
    // }),
    new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, 'src/index.ejs'),
        version: pkgJson.version,
        // gapiKey: process.env.CORIOLIS_GAPI_KEY || '',
        date: buildDate,
      }),
      new MiniCssExtractPlugin({
        filename: 'app.css',
        disable: false,
        allChunks: true
      }),
    ],
    module: {
      rules: [
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader' ]},
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ]
        },
        { test: /\.(js|jsx)$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' }
      ]
    }
};