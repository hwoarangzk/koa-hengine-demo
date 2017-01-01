var art = require('art-template/node/template-native.js');

process.on('message', function(msg) {

	var id = msg.id,
		tmpl = msg.tmpl,
		data = msg.data;

	var r = art.compile(tmpl)(data);

	setTimeout(function() {
		process.send({
			id: id,
			html: r
		});
	}, 3000);
});

process.on('exit', function() {
	console.log('111111111111111111111child process exited');
});

process.on('close', function() {
	console.log('1111111111111111111111child process closed');
});

process.on('disconnect', function() {
	console.log('11111111111111111111111child process disconnected');
	process.exit(1);
});

process.on('error', function() {
	console.log('33333333333child process error in child process');
	process.exit(1);
});