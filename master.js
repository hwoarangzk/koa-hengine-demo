var koa = require('koa');
var art = require('art-template/node/template-native.js');
var app = koa();

var fork = require('child_process').fork;
var n = fork('./child.js', [], {
	//这里加这个参数是因为在vscode里调试的时候
	//子进程要用一个不同的port
	//否则vscode会报错
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

	//假设1s后没反应，则认为子进程渲染死循环了
	setTimeout(function() {
		p.reject(new Error('timeout error'));
	}, 1000);

	return p;
}

process.on('SIGTERM', function() {
	console.log('-----------------SIGTERM------------------');
	console.log(arguments);
});

process.on('uncaughtException', function() {
	console.log('-----------------uncaughtException------------------');
	console.log(arguments);
});

n.on('message', function(r) {
	var id = r.id,
		html = r.html;
	queue[id].resolve(html);
});

app.on('error', function() {
	console.log('app error occured');
	process.exit(1);
});

app.use(function *() {
	var id = Math.random().toString().substring(2);
	this.body = yield render(id, {name: 'vergil1'});
});

app.listen(3000);