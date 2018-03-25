const path = require('path');

module.exports = {
  entry: './src/navbar.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src')
  },
  module: {
        loaders: [
            {test: /\.css/, loaders: ["style-loader", "css-loader"] },
            {test: /\.jsx/, loader: "babel-loader", query: {cacheDirectory: true, presets: ["es2015", "react", "stage-0"] }},
            {test: /\.js/, loader: "babel-loader", query: {cacheDirectory: true, presets: ["es2015", "react", "stage-0"] }}
        ]
    },
  resolve: ["", ".js", ".jsx", ".css"],
};