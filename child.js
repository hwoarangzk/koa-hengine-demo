var art = require('art-template/node/template-native.js');

process.on('message', function(msg) {

	var id = msg.id,
		tmpl = msg.tmpl,
		data = msg.data;

	var r = art.compile(tmpl)(data);

	//这里故意写一个死循环
	//来测试触发父进程里promise的reject
	//正常流程里是不会有这个死循环的
	// while (1) {

	// }

	process.send({
		id: id,
		html: r
	});
});