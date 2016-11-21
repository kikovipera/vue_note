const log = str => console.log(str)
const path = require('path')
const express = require('express')
const os = require('os')
const app = express()

app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')
app.set('views', path.resolve('server'))
app.use('/dist', express.static(path.resolve('dist')))

app.use('/favicon.ico', (req, res) => {
  console.log(req.url)
  res.send('')
})

app.use('/', (req, res) => {
  console.log(req.url)
  res.render('../index.html')
})

const getIPAddress = function() {
  const ifaces = os.networkInterfaces()
  let ip = ''
  for (let dev in ifaces) {
    ifaces[dev].forEach(function(details) {
      if (ip === '' && details.family === 'IPv4' && !details.internal) {
        ip = details.address
        return
      }
    })
  }
  return ip || "127.0.0.1"
}

app.listen(8134, () => {
  console.log(`server start on http://${getIPAddress()}:8134`);
})
