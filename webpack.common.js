const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "vm": require.resolve("vm-browserify"),
      "constants": require.resolve("constants-browserify"),
      // "fs": false
    }
  },
  optimization: {
    usedExports: true
  },
  output: {
    path: path.join(__dirname, 'build'),
    chunkFilename: '[name].bundle.js',
    // assetModuleFilename: '[contenthash][ext]',
    publicPath: '/',
    clean: true // we already do rimraf on the build dir, but this should obviate that
  },
  plugins: [
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
        {
          test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
        },
      ]
    }
};
