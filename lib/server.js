const http = require('http');
const server = http.createServer();
var routes = require('./routes.js')

var checkRoute = (req, res) => {
    var r = false
    routes.forEach((route)=>{
        if (req.url == route.url) {
            r = true
            route.do(res)
        }
    })

    if (!r) {
        structure.getNodeByUrl(req.url, (node) => {
            if (node) {
                res.writeHead(200);
                res.end(mpr(node))
            } else {
                res.writeHead(404);
                res.end("404 Not Found\n");
            }
        }) 
    }
}

server.on('request', (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")
    if (req.method == 'GET') {
        checkRoute(req, res)
    }
});

module.exports = server
