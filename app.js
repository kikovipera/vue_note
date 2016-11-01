// require('babel-core/register')({
//   presets: ['es2015-node5', 'stage-3']
// })
const app = require('./server/server')
app.listen(7788, () => {
  console.log('localhost:' + 7788)
})


