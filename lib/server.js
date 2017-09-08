const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    if (req.method == 'GET') {
        server.emit('get', req, res)
    }
});

module.exports = server
