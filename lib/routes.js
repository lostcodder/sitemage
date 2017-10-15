var fs = require("fs")

module.exports = [
    {
        url: '/admin/',
        do: (res) => {
            template.render('admin/layout.tpl', {}, (err, out) => {
                res.end(out)
            })
        }
    },
    {
        url: '/r',
        do: (res) => {
            structure.fillNodes((err, r)=>{
                res.end(mpr(r.ops))
            })
        } 
    },
    {
        url: '/api/nodes',
        do: (res) => {
            structure.getTree((tree) =>{
                res.end(JSON.stringify([tree]))
            })
        }
    },
    {
        url: '/admin/styles/sitemage.css',
        do: (res) => {
            var f = './lib/themes/admin/styles/sitemage.css'
            res.setHeader("Content-Type", 'text/css')
            fs.readFile(f, (err, data)=>{
                res.end(data)
            })
        }
    },
    {
        url: '/admin/js/sitemage.js',
        do: (res) => {
            var f = './lib/themes/admin/js/sitemage.js'
            res.setHeader("Content-Type", 'application/javascript')
            fs.readFile(f, (err, data)=>{
                res.end(data)
            })
        }
    }
]