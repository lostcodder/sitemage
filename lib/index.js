var express = require('express')
var app = express()
var port = 80
var dust = require("dustjs-linkedin")
var fs = require("fs")

var precompiledDir = __dirname + '/'
var templatesDir = __dirname + '/themes/default/'

var scanDir = (p, a = false) => {
    var res = []
    var files = fs.readdirSync(p)
    files.forEach((f)=>{
        if (fs.statSync(p + '/' + f).isDirectory()) {
            if (a) var pnew = a + '/' + f
            else pnew = f
            res = res.concat(scanDir(p + '/' + f, pnew))
        } else {
            if (a) f = a + '/' + f
            res.push(f)
        }
    })

    return res
}

var templates = scanDir(templatesDir)

var compileTemplate = (name) => {
    var src = fs.readFileSync(templatesDir + name, 'utf8');
    return dust.compile(src, name);
}

var compileTemplates = (names) => {
    var p = []

    names.forEach((name) => {
        p.push(compileTemplate(name))   
    })

    fs.writeFileSync(precompiledDir + 'precompiled.json', JSON.stringify(p));
}

var loadTemplates = () => {
    var p = JSON.parse(fs.readFileSync(precompiledDir + 'precompiled.json', 'utf8'));
    p.forEach((d) => {
        dust.loadSource(d)
    })
}

app.get('/', function(req, res) {
    dust.render('layout.tpl', {world: 'kekeke'}, function(err, out) {
         res.send(out)
    });
});

exports.start = () => {
    compileTemplates(templates)
    loadTemplates()

    app.listen(port)
    console.log('Listening on http://localhost:' + port); 
}




