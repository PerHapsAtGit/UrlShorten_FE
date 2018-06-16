const path = require('path');
const resolve = path.resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
});
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleLintPlugin = require('stylelint-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  target: 'web',
  entry: ['@babel/polyfill','./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/,
      },
      { test: /\.json$/,
        use: [
          {
            loader: 'json-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new MiniCssExtractPlugin({
      filename: 'assets/style.css',
    }),
    new styleLintPlugin({
      configFile: '.stylelintrc',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
    }),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      ['~']: resolve(__dirname, 'src'),
    },
  },
};