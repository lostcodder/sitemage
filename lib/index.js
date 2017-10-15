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
    global.template = require('./template.js')
    require('./db.js')
} catch (err) {
    addError(err)
}

exports.start = () => {
    var port = config.server.port
    server.listen(port);
    console.log('Listening on http://localhost:' + port); 
}




