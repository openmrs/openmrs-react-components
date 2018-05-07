var webpack = require('webpack');
var path = require('path');

var libraryName = 'openmrs-contrib-reactcomponents';

// TODO figure out min vs non-min
var outputFile = libraryName + '.bundle.min.js';


module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/lib/.`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  }
};
