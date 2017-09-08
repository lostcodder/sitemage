var collection = db.collection('structure');
ObjectID = require('mongodb').ObjectID

var insertRoot = (callback) => {
    node = {id: 'root', title: 'Главная', url: '/', template: 'layout.tpl', parent: false}
    collection.insertOne(node, (err, r) => {
        callback(err, r)
    })        
}

var insertNode = (id, title, template, parent, callback) => {
    getNode(new ObjectID(parent), (parentNode) => {
        var url = parentNode.url + node.id + '/'
        var node = {id: id, title: title, url: url, template: template, parent: parent}
        collection.insertOne(node, (err, r) => {
            callback(err, r)
        })        
    })
}

var fillNodes = (callback) => {
    collection.drop(()=>{
        insertRoot((err, r) => {
            var rootId = r.ops[0]._id
            var nodes = [
                {id: 'about', title: 'О нас', url: '/about/', template: 'null.tpl', parent: rootId},
                {id: 'uslugi', title: 'Услуги', url: '/uslugi/', template: 'null.tpl', parent: rootId},
                {id: 'contacts', title: 'Контакты', url: '/contacts/', template: 'null.tpl', parent: rootId}
            ]
            collection.insertMany(nodes, (err, r) => {
                callback(err, r)
            })         
        })        
    })
}

var getTree = (callback) => {
    getNodes((nodes) => {
        var res = nodes.shift()
        res.url = '/'
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

var getNodeById = (id, callback) => {
    collection.find({id: id}).toArray((err, r) => {
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
exports.insertRoot = insertRoot
exports.fillNodes = fillNodes