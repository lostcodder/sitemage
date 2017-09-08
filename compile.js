var fs = require("fs")
var dust = require("dustjs-linkedin")

var templates = ['body', 'layout', 'footer']

var compileTemplates = (names) => {
    names.forEach((name) => {
        var src = fs.readFileSync(__dirname + '/lib/themes/default/' + name + '.tpl', 'utf8');
        var compiled = dust.compile(src, name);
        fs.writeFileSync(__dirname + '/lib/themes/default/precompiled/' + name + '.js', compiled);     
    })
}

compileTemplates(templates)
