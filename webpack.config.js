var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/log_healthy.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
<<<<<<< HEAD
<<<<<<< HEAD
  devtool: 'source-maps',
=======
>>>>>>> 250a21fa7bfd9b6691a5b75a8d3a03893bebbba9
=======
>>>>>>> fb22e4ae2b1cfcefd1da99ce92d6d004f6739009
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  }
};
