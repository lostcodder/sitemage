<!DOCTYPE HTML>
<html>
    <head>
    <link rel="stylesheet" href="//cdn.webix.com/edge/webix.css" type="text/css">
    <script src="//cdn.webix.com/edge/webix.js" type="text/javascript"></script>
    </head>
    <body>
        <script type="text/javascript" charset="utf-8">
        webix.ready(function(){
            tree = new webix.ui({
                container:"testA",
                view:"tree",
                select: true,
                template:"{common.icon()} <span>#title#<span>",
                url: '/api/nodes',
                datatype:"json"
            })
        });

        </script>
        <div id="testA" style='width:250px; height:250px;'></div>
    </body>
</html>