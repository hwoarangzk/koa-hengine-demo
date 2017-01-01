var express = require('express');
var art = require('art-template/node/template-native.js');
var app = express();

var str = 'hello, <%= name%>';

var render = function(data) {
	return art.compile(str)(data);
}

app.use(function(req, res) {

	res.end(render({
		name: 'vergil'
	}));
	
});

app.listen(3000);