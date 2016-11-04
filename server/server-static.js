const path = require('path');
const request = require('request');
const express = require('express');
const app = express();
const apiMapping = require('./api.js');
const config = require('./config.json');

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.resolve('server'));
app.use('/dist', express.static(path.resolve('dist')));

app.use('/favicon.ico', (req, res) => {
    res.send('');
});

app.use((req, res, next) => {
    if (req.originalUrl.indexOf('/main/getSign') > -1) {
        res.send('');
        return;
    }
    // 等 fe 上的 api 都整理好了,这块再想想怎么实现
    // if (req.originalUrl.startsWith('/feAPI/')) {
    //     let url = `http://fe.superjia.com:8080/s/api/debug/${apiMapping[config.current]}${req.originalUrl.substring(6)}`;
    //     console.log(`${new Date} >> ${url}`);
    //     try {
    //         req.pipe(request(url)).pipe(res);
    //     } catch (e) {
    //         console.log(e);
    //         next();
    //     }
    // } else {
        next();
    // }

});

app.use('/', (req, res) => {
    res.render('index.html', {
        staticTag: config.current
    });
});


/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
const os = require('os');
var getIPAddress = function () {
    var ifaces = os.networkInterfaces();
    var ip = '';
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (ip === '' && details.family === 'IPv4' && !details.internal) {
                ip = details.address;
                return;
            }
        });
    }
    return ip || "127.0.0.1";
};

app.listen(8134, () => {
    console.log(`server start on http://${getIPAddress()}:8134`);
});