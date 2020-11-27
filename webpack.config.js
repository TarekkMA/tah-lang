const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * @returns {import("webpack").Configuration}
 */
const config = (env) => {
  const isProd = env.PROD != undefined;
  return {
    mode: isProd ? 'production' : 'development',
    entry: './webapp/index.ts',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'js/[name].[chunkhash:8].js',
      publicPath: isProd ? '/tah-lang' : '/',
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
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/i,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  };
};

module.exports = config;
