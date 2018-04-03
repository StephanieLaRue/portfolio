const path = require('path');

module.exports = {
  entry: {
    nav: './src/navbar.jsx',
    blog: './blogComponents/blog.jsx'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public')
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
