const webpack = require('webpack')
const config = require('./webpack.base.conf.js')
const ExtractTextPlugin = require("extract-text-webpack-plugin") // link
const WebpackNotifierPlugin = require('webpack-notifier') // err

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard()

config.plugins = (config.plugins || []).concat([
  new webpack.optimize.UglifyJsPlugin({ // 压缩
    compress: { warnings: false }
  }),
  new ExtractTextPlugin("[name].css"), // link
  new webpack.optimize.CommonsChunkPlugin('common', 'vue_common.js'), //公共js
  new WebpackNotifierPlugin({ // 错误提示
    excludeWarnings: false,
    alwaysNotify: true
  }),
  new webpack.ProvidePlugin({ // 全局变量
    Vue: 'vue',
    Toast: 'toast'
  })
])

config.watch = false
config.devtool = false
module.exports = config
