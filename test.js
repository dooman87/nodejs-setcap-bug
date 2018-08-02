var http = require("http");
var https = require("https");
var process = require('process');

const get = function(options, onResult)
{
    const port = options.port == 443 ? https : http;
    const req = port.request(options, function(res)
    {
        let output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            onResult(res.statusCode, output);
        });
    });

    req.on('error', function(err) {
        console.log('ERROR', err.message);
    });

    req.end();
};

const options = {
    host: 'secure.internal',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'text/html'
    }
};

get(options, function(statusCode, result) {
    console.log("onResult: (" + statusCode + ")" + result);
});