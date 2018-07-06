'use strict'

const path = require('path');

module.exports = {
  entry: {
    nav: './src/navbar.jsx',
    blog: './src/blogComponents/blog.jsx'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
        rules: [
            {
              test: /\.css$/, 
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
              test: /.jsx?$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["env"], ["react"]]
                }
              }
            }   
        ]
    },
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  },
  performance: {
    hints: false
  }
};
