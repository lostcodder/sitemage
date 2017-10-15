
var nodemon = require('nodemon');
nodemon({
  script: 'bin/sitemage.js',
  ext: 'js tpl',
  "delay": "500"
});

nodemon.on('start', function () {
  console.log('App has started');

}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});

