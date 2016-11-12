const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const generateExtractLoaders = loaders => {
  return loaders.map(function (loader) {
    return loader + '-loader' + (!yargs.product ? '?sourceMap' : '')
  }).join('!')
}

const entry = {}
entry.app = './components/app.js'
entry.common = [
  'vue',
  './common/common.css'
]

const config = {
  entry: entry,
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  resolve: {
    extension: ['', '.js', '.vue'],
    root: path.resolve('./common'), // 先查找root，也可直接根目录用./
    alias: {
      'log': 'log.js',
      'toast': 'toast'
    }
  },
  resolveLoader: {
    root: path.join(__dirname, './node_modules')
  },
  debug: true,
  devtool: 'source-map',
  //不包括列信息
  // devtool:'cheap-source-map',
  // devtool: 'cheap-module-source-map'
  watch: true,
  plugins: [],
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue',
    }, {
      test: /\.js$/,
      exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
      loader: 'babel!eslint',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    }, {
      test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)$/,
      loader: 'url-loader?limit=8192' //url-loader是对文件加载器file-loader的封装，并且在file-loader完成后进行一些更多的处理
    }]
  },
  babel: {
    presets: ['es2015', 'stage-3'],
    plugins: ['transform-runtime'],
    cacheDirectory: '.tmp'
  },
  vue: {
    loaders: {
      // js: 'babel!eslint', //script 如果给script添加lang=babel用到
      css: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css'])),
      less: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'less'])),
      sass: ExtractTextPlugin.extract('vue-style-loader', generateExtractLoaders(['css', 'sass']))
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}

module.exports = config
