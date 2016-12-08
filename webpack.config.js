var webpack = require('webpack'),
    path = require('path');

module.exports = {
  context: __dirname + "/public/js/dev",
  entry: "./main",
  output: {
      path: __dirname + "/public/js/build",
      filename: "bundle.js"
  }
};
