var koa = require('koa');
var art = require('art-template/node/template-native.js');
var app = koa();

var str = 'hello, <%= name%>';

var render = function(data) {
	return art.compile(str)(data);
}

app.use(function *() {

	this.body = render({
		name: 'vergil'
	});
	
});


app.listen(3000);