const webpack = require('webpack')
const config = require('./webpack.base.conf.js')
const HtmlwebpackPlugin = require('html-webpack-plugin') // html
const ExtractTextPlugin = require("extract-text-webpack-plugin") // link
const WebpackNotifierPlugin = require('webpack-notifier') // err

config.entry.common = config.entry.common.concat('log')
config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'), // 注入
    VERSION: JSON.stringify(require('../package.json').version)
  }),
  new ExtractTextPlugin("[name].css"), // link
  new webpack.optimize.CommonsChunkPlugin('common', 'vue_common.js'), // 公共js
  new WebpackNotifierPlugin({ excludeWarnings: false, alwaysNotify: true }), // 错误提示
  new webpack.ProvidePlugin({
    Toast: 'toast',
    Fetch: 'fetch',
    Vue: 'vue',
    log: 'log'
  }),
  new HtmlwebpackPlugin({ // 将会自动在 dist 目录中生成一个名为 index.html 的文件
      title: '我的笔记',
      template: 'build/tpl.html',
      inject: 'body',
      chunks: ['app', 'common'], //只加载配置 excludeChunks 排除
      filename: '../index.html' // 另外输出
  })
])

module.exports = config
