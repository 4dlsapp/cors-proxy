const fs = require('fs');
const https = require('https');
// Listen on a specific host via the HOST environment variable
let host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
let port = process.env.PORT || 3000;
let porthtps = process.env.PORT || 2377;



let cors_proxy_https = require('cors-anywhere');

cors_proxy_https.createServer({
          httpsOptions: {
    key: fs.readFileSync('/etc/letsencrypt/live/crsprxy.ml/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/crsprxy.ml/fullchain.pem')
      },
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(porthtps, host, function () {
    console.log('Running CORS Anywhere HTTPS on ' + host + ':' + porthtps);
});

let cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function () {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
