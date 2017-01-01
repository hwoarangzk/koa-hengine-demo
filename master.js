var koa = require('koa');
var art = require('art-template/node/template-native.js');
var app = koa();

var fork = require('child_process').fork;
var n = fork('./child.js', [], {
	execArgv: ['--debug=5555']
});

var str = 'hello, <%= name%>';

var queue = {};

var render = function(id, data) {
	var r, j;
	var p = new Promise(function(resolve, reject) {
		r = resolve;
		j = reject;
	});

	queue[id] = p;
	p.resolve = r;
	p.reject = j;

	n.send({
		id: id,
		tmpl: str,
		data: data
	});

	setTimeout(function() {
		p.reject(new Error('timeout error'));
	}, 1000);

	return p;
}

n.on('message', function(r) {
	var id = r.id,
		html = r.html;
	queue[id].resolve(html);
});

n.on('error', function() {
	console.log('child process error occured22222222222222222222');
});

app.on('error', function() {
	console.log('app error occured........');
	n.disconnect();
});

app.use(function *() {
	var id = Math.random().toString().substring(2);
	this.body = yield render(id, {name: 'vergil1'});
});

app.listen(3000);