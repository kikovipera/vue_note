/*
 * @Author: baiwenhao
 * @Date:   2016-05-14 13:11:34
 * @Last Modified by:   baiwenhao
 * @Last Modified time: 2016-05-14 13:11:34
 */

let config
const del = require('del'),
  gulp = require('gulp'),
  zip = require('gulp-zip'),
  rename = require('gulp-rename'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream')
  log = (str) => { console.log(str) }

global.yargs = require('yargs').default({item: 'vue'}).argv

if (yargs.product) {
  config = require('./build/webpack.prod.conf.js')
} else {
  config = require('./build/webpack.local.conf.js')
}

gulp.task('default', () => {
  // gulp.start('del')
  if(yargs.product){
    log('--------生产环境--------')
    gulp.start('vueStream')
  } else {
    log('--------本地环境--------')
    gulp.start('vue')
  }
})

gulp.task('vue', () => {
  webpack(config, (err, stats) => {
    // var jsonStats = stats.toJson();
    // if (jsonStats.errors.length > 0)
    //   log(jsonStats.errors.toString())
    // if (jsonStats.warnings.length > 0)
    //   log(jsonStats.errors.toString())
    console.log((stats.compilation.errors.toString() || stats.compilation.warnings.toString()).replace(/:|,/g,'\n======'));
    require('set-iterm2-badge')(yargs.item || 'vue_product')
  })
})

gulp.task('vueStream', () => {
  return gulp.src('./')
    .pipe(webpackStream(config))
    .pipe(gulp.dest('./dist'))
})

gulp.task('del', () => {
  del(['dist', 'zip']).then(paths => {
    log(paths.join('\n'))
  })
})

gulp.task('zip', () => {
  return gulp.src(['dist/*', '!dist/index.html'])
    .pipe(zip('item.zip'))
    .pipe(gulp.dest('zip'))
})

gulp.task('backup', () => {
  return gulp.src('./zip/item.zip')
    .pipe(rename(time + '.zip'))
    .pipe(gulp.dest('backup'))
})

gulp.task('ico', () => {
  return gulp.src('./' + argv + '/*.ico')
    .pipe(gulp.dest('dist'))
})

gulp.task('server', () => {
  require('gulp-nodemon')({
    script: './server/server-static.js',
    ignore: ['dist/*', '*.vue']
  }).on('restart', function() {
    console.log('localhost:8888')
  })
})

var time = (() => {
  var d = new Date()
  return [d.getFullYear() + '-', (d.getMonth() + 1) + '-', d.getDate() + ' ', d.getHours() + ':', d.getMinutes()].join('')
})()

//fs-extra
