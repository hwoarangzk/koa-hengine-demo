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
	}, 0);
});