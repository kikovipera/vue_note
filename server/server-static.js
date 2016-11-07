const path = require('path')
const request = require('request')
const express = require('express')
const os = require('os')
const app = express()

app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')
app.set('views', path.resolve('server'))
app.use('/dist', express.static(path.resolve('dist')))

app.use('/favicon.ico', (req, res) => {
    res.send('')
})

app.use('/', (req, res) => {
    res.render('../index.html')
})

var getIPAddress = function () {
    var ifaces = os.networkInterfaces()
    var ip = ''
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
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
