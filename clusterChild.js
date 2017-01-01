var koa = require('koa');
var art = require('art-template/node/template-native.js');
var app = koa();

var str = 'hello, <%= name%>';

var render = function(data) {
	return art.compile(str)(data);
}

app.use(function *() {

	// while (1) {}

	this.body = render({
		name: 'vergil'
	});
	
});

app.listen(3000);

// process.on('message', function(msg) {
// 	if (msg === 'shutdown') {
// 		console.log('cluster shutdown----------------');
// 		process.exit(1);
// 	}
// });

// process.on('disconnect', function() {
// 	console.log('child cluster disconnected---------');
// 	process.exit(1);
// });

// setInterval(function() {
// 	process.send({
// 		alive: true,
// 		pid: process.pid
// 	});
// }, 1000);