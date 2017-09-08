var fs = require("fs")
var server = require('./server.js')
var nl2br  = require('nl2br');
global.config = JSON.parse(fs.readFileSync("lib/config.json"))
global.error = false
function addError(err) {
    error = nl2br(err.stack).replace(/    /g, '\u00a0\u00a0\u00a0\u00a0')
}
global.mpr = (o) => {
    return '<pre>' + JSON.stringify(o, null, '    ') + '</pre>'
}
try {
    var template = require('./template.js')
    require('./db.js')
} catch (err) {
    addError(err)
}

server.on('get', (req, res)=>{
    if (req.url == '/r') {
        structure.fillNodes((err, r)=>{
            res.end(mpr(r.ops))
        })
    } else if (req.url == '/admin/') {
        template.render('layout.tpl', {}, (err, out) => {
            res.end(out)
        })
    } else if (req.url == '/api/nodes') {
        structure.getTree((tree) =>{
            res.end(JSON.stringify([tree]))
        })
    } else {
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
})

exports.start = () => {
    var port = config.server.port
    server.listen(port);
    console.log('Listening on http://localhost:' + port); 
}




