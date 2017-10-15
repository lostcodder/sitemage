<!DOCTYPE HTML>
<html>
    <head>
    <link rel="stylesheet" href="//styles/sitemage.css" type="text/css">
    <script src="//js/sitemage.js" type="text/javascript"></script>
    </head>
    <body>
        <script type="text/javascript" charset="utf-8">
        webix.ready(function(){
            tree = new webix.ui({
                container:"testA",
                view:"tree",
                template:"{common.icon()} <span>#title#<span>",
                url: '/api/nodes',
                datatype:"json"
            })
        });

        </script>
        <div id="testA" style='width:250px; height:250px;'></div>
    </body>
</html>