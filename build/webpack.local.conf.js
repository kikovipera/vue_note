const webpack = require('webpack')
const config = require('./webpack.base.conf.js')
const HtmlwebpackPlugin = require('html-webpack-plugin') // html
const BrowserSyncPlugin = require('browser-sync-webpack-plugin') // server
const ExtractTextPlugin = require("extract-text-webpack-plugin") // link
const WebpackNotifierPlugin = require('webpack-notifier') // err

// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin');
// const dashboard = new Dashboard()

config.entry.common = ( config.entry.common || []).concat(
  'log'
)

if (yargs.server) {
  config.plugins = [
    //将会自动在 dist 目录中生成一个名为 index.html 的文件
    new HtmlwebpackPlugin({
        title: yargs.item,
        template: 'build/tpl.html',
        inject: 'body',
        chunks: [yargs.item, 'common'], //只加载配置 excludeChunks 排除
        // filename: 'node.html' // 另外输出
    }),
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 8888,
        server: {
            baseDir: ['dist'] // index.html 在这个目录
        }
    }, {
        reload: true // 自动刷新
    })
  ]
}

if (yargs.compress) { // 是否压缩文件
  config.plugins = (config.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ])
}

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'), // 注入
    VERSION: JSON.stringify(require('../package.json').version)
  }),
  new ExtractTextPlugin("[name].css"), // link
  new webpack.optimize.CommonsChunkPlugin('common', 'vue_common.js'), // 公共js
  new WebpackNotifierPlugin({ excludeWarnings: false, alwaysNotify: true }), // 错误提示
  new webpack.ProvidePlugin({ // 全局对象
    Fetch: 'fetch',
    Vue: 'vue',
    log: 'log'
  }),
  // new DashboardPlugin(dashboard.setData) // 编译插件
])

module.exports = config
