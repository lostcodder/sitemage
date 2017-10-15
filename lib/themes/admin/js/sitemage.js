function Tree () {
    this.a = []

    this.ajax = (url, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            var d = JSON.parse(xhr.responseText)
            callback(d)
        }
    }

    this.getChilds = (nodes) => {
        nodes.forEach((child)=>{
            this.a.push(child)
            if (child.data) {
                this.getChilds(child.data)
            }
        })
    }

    this.createElements = () => {
        this.nodes = []
        this.a.forEach((node)=>{
            var p = 30 * node.level + 10
            var d = document.createElement('div')
            d.innerHTML = node.title
            d.style.paddingLeft = p + 'px'
            d.classList.add('kekeke');
            document.body.appendChild(d)
            this.nodes.push(d);
        })            
    }

    this.loadData = (url) => {
        this.ajax(url, (d)=> {
            this.getChilds(d)
            
            this.createElements()
        })
    }
}

function Menu(data) {
    this.data = data
    this.elements = []
    this.box = false
    this.container = false

    this.createEl = (type, c, parent) => {
        var d = document.createElement(type)
        d.classList.add(c)
        parent.appendChild(d)

        return d
    }

    this.createMenuItem = (i) => {
        var item = this.createEl('li', 'left_menu_item', this.container)
        //var row = this.createEl('div', 'left_menu_row', item)
        //var wrap = this.createEl('div', 'left_menu_item_wrap', row)
        var icon = this.createEl('div', 'left_menu_item_icon', item)
        var text = this.createEl('div', 'left_menu_item_text', item)
        //var exp = this.createEl('div', 'left_menu_item_exp', wrap)

        text.innerHTML = i.title;
        return item
    }

    this.createElements = () => {
        this.box = this.createEl('div', 'left_menu', document.getElementById('container'))
        this.container = this.createEl('ul', 'left_menu_container', this.box)

        this.data.forEach((item)=>{
            var d = this.createMenuItem(item)
            this.elements.push(d)
        })
    }

    this.createElements()
}

window.onload = function() {
    var menuData = [
        {title: 'Profile'},
        {title: 'Pages'},
        {title: 'Widgets'},
        {title: 'Forms'},
        {title: 'Charts'}
    ]
    var leftMenu = new Menu(menuData)
    //var nodeTree = new Tree()
    //nodeTree.loadData('/api/nodes')

};

