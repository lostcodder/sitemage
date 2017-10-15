var collection = db.collection('structure');
ObjectID = require('mongodb').ObjectID



var insertNode = (name, title, template, parent, callback) => {
    getNode(new ObjectID(parent), (parentNode) => {
        var node = {name: name, title: title, url: url, template: template, parent: parent}
        var url = parentNode.url + node.name + '/'
        collection.insertOne(node, (err, r) => {
            callback(err, r)
        })        
    })
}

var fillNodes = (callback) => {
    collection.drop(()=>{
        var rootNode = {name: 'root', title: 'Главная', url: '/', template: 'layout.tpl', parent: false}
        collection.insertOne(rootNode, (err, r) => {
            var rootId = r.ops[0]._id
            var nodes = [
                {name: 'about', title: 'О нас', url: '/about/', template: 'null.tpl', parent: rootId},
                {name: 'uslugi', title: 'Услуги', url: '/uslugi/', template: 'null.tpl', parent: rootId},
                {name: 'contacts', title: 'Контакты', url: '/contacts/', template: 'null.tpl', parent: rootId}
            ]
            collection.insertMany(nodes, (err, r) => {
                var uslugiId = r.ops[1]._id
                var nodes = [
                    {name: 'usluga1', title: 'Первая услуга', url: '/uslugi/usluga1/', template: 'null.tpl', parent: uslugiId},
                    {name: 'usluga2', title: 'Вторая услуга', url: '/uslugi/usluga2/', template: 'null.tpl', parent: uslugiId},
                    {name: 'usluga3', title: 'Третья услуга', url: '/uslugi/usluga3/', template: 'null.tpl', parent: uslugiId}
                ]

                collection.insertMany(nodes, (err, r) => {
                    callback(err, r)
                })
            })         
        })        
    })
}

var getTree = (callback) => {
    getNodes((nodes) => {
        var res = nodes.shift()
        res.url = '/'
        res.level = 0
        var tree = getChilds(nodes, res)
        if (tree) {
            res.data = tree
        }
        callback(res)
    })
}

var getNode = (id, callback) => {
    collection.find({_id: new ObjectID(id)}).toArray((err, r) => {
        if (r.length > 0) callback(r[0])
        else callback(false)
    })    
}

var getNodeByName = (name, callback) => {
    collection.find({name: name}).toArray((err, r) => {
        if (r.length > 0) callback(r[0])
        else callback(false)
    })    
}

var getNodeByUrl = (url, callback) => {
    if (url.length > 1 && url.substr(-1) != '/') url = url + '/'
    collection.find({url: url}).toArray((err, r) => {
        if (r.length > 0) callback(r[0])
        else callback(false)
    })    
}

var getChilds = (nodes, node) => {
    var childs = []
    var r = []

    nodes.forEach((child)=>{
        if (child.parent.equals(node._id)) {
            child.level = node.level + 1
            childs.push(child)
        }
        else r.push(child)
    })

    if (childs.length > 0) {
        childs.forEach((child, i)=>{
            var rec = getChilds(r, child)
            if (rec) {
                childs[i].data = rec
            }
        })

        return childs
    } else {
        return false
    }
}

var getNodes = (callback) => {
    collection.find().toArray((err, r) => {
        callback(r)
    })
}




exports.insertNode = insertNode
exports.getTree = getTree
exports.getNode = getNode
exports.getNodeByUrl = getNodeByUrl
exports.fillNodes = fillNodes