global.yargs = require('yargs').argv
const del = require('del'),
  gulp = require('gulp'),
  zip = require('gulp-zip'),
  rename = require('gulp-rename'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream')
  log = (str) => { console.log(str) }
  config = require(yargs.product ? './build/webpack.prod.conf' : './build/webpack.local.conf')

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
    console.log((stats.compilation.errors.toString() || stats.compilation.warnings.toString()).replace(/:|,/g,'\n======'));
    require('set-iterm2-badge')('我的笔记')
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
    script: './server/staticServer.js',
    ignore: ['dist/*', '*.vue']
  }).on('restart', function() {
    console.log('success')
  })
})

var time = (() => {
  var d = new Date()
  return [d.getFullYear() + '-', (d.getMonth() + 1) + '-', d.getDate() + ' ', d.getHours() + ':', d.getMinutes()].join('')
})()

//fs-extra
