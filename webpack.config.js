const webpack = require('webpack')
const path = require('path')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    common: [
      'babel-polyfill', 'react',
      './index.js'
    ],
    homepage: [
      './scenes/homepage/index.js'
    ],
    todos: [
      './scenes/todos/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'sass'
        ]
      },
      {
        test: /\-worker\.js$/,
        exclude: /node_modules/,
        loaders: [
          'worker',
          'kea-parallel'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          // 'react-hot',
          'babel-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./src'),
      'node_modules'
    ],
    alias: {
      '~': path.join(__dirname, './src')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2,
      filename: 'common.bundle.js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ],
  devServer: {
    contentBase: './src'
    // hot: true
  }
}
