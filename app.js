require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3']
})
const app = require('./server/app.js')
app.listen(9999)
console.log(9999)