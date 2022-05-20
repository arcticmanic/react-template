const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshTypeScript = require('react-refresh-typescript')

const paths = require('./paths')

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: paths.public,
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store'],
        },
        noErrorOnMissing: true,
      },
    ],
  }),
  new HtmlWebpackPlugin({
      title: 'Webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/template.html',
      filename: 'index.html',
    }),
]

module.exports = isDevelopment => ({
  plugins,
  entry: [paths.src + '/index.tsx'],
  devtool: 'source-map',

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ['html-loader'] },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(svg)$/, type: 'asset/inline' },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: isDevelopment ? [ReactRefreshTypeScript()] : [],
              }),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
});
