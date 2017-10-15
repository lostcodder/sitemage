var dust = require("dustjs-linkedin")
dust.config.whitespace = true
var fs = require("fs")

var precompiledDir = __dirname + '/'
var templatesDir = __dirname + '/themes/'

var scanDir = (p, a = false) => {
    var res = []
    var ignore = ['styles', 'js']
    var files = fs.readdirSync(p)
    files.forEach((f)=>{
        if (fs.statSync(p + '/' + f).isDirectory()) {
            if (!ignore.includes(f)) {
                if (a) var pnew = a + '/' + f
                else pnew = f
                res = res.concat(scanDir(p + '/' + f, pnew))     
            }
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

compileTemplates(templates)
loadTemplates()

exports.render = (name, o, callback) => {
    dust.render(name, o, function(err, out) {
         callback(err, out)
    });
}