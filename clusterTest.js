var koa = require('koa');
var art = require('art-template/node/template-native.js');
var app = koa();

var cluster = require('cluster');
cluster.setupMaster({
	exec: __dirname + '/clusterChild.js'
});

var worker = cluster.fork();

// process.on('SIGTERM', function() {
// 	console.log('-----------------SIGTERM------------------');
// 	console.log(arguments);
// });

// process.on('uncaughtException', function() {
// 	console.log('-----------------uncaughtException------------------');
// 	console.log(arguments);
// 	process.exit(1);
// });

var timeout;
cluster.on('message', function(data) {
	if (data && data.alive) {
		console.log('----cluster alive-----');
		console.log(data);
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			console.log('-----no response from cluster-----');
			process.exit(1);
		}, 3000);
	}
});