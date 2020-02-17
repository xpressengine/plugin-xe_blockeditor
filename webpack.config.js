const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const externals = {
  react: 'React',
  'react-dom': 'ReactDOM'
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './assets/src/js/xe-blockeditor.js',
  output: {
    filename: 'xe-blockeditor.js',
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
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
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
    new MiniCssExtractPlugin({ filename: 'xe-blockeditor.css' }),
    new webpack.NormalModuleReplacementPlugin(
      /gutenberg\/packages\/.+\/add-query-args.js$/,
      path.resolve(__dirname, './assets/src/js/gutenberg/add-query-args.js')
    )
  ]
}
