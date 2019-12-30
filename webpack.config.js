const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const externals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './assets/src/js/laraberg.js',
  output: {
    filename: 'laraberg.js',
    path: path.resolve(__dirname, 'assets')
  },
  devtool: 'source-map',
  externals: externals,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'laraberg.css' })
  ]
}
