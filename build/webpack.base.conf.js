const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin") //link
const generateExtractLoaders = loaders => {
  return loaders.map(function (loader) {
    return loader + '-loader' + (!yargs.product ? '?sourceMap' : '')
  }).join('!')
}

/*------入口------*/
const entry = {}
entry.note = './components/Router.js'
entry.common = [
  'vue',
  './common/common.css'
]

/*------基础配置------*/
const config = {
  entry: entry,
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js', //entry 的 key
    publicPath: '/' // cdn
  },
  resolve: {
    extension: ['', '.js', '.vue'],
    root: path.resolve('./common'), // 先查找root，也可直接根目录用./
    alias: {
      'log': 'log.js'
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


// webpack-dashboard  提示插件