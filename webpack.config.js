const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * @type {import("webpack").Configuration}
 */
const config = {
  mode: 'production',
  entry: './webapp/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'tah-main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './webapp/index.html',
    }),
    new MonacoWebpackPlugin({
      languages: [],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = config;
