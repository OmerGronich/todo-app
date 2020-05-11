const mongoose = require('mongoose');

const { connectionURL } = require('../config');

module.exports = function connect() {
	require('../models/todo');
	require('../models/user');

	return mongoose
		.connect(connectionURL + '/todo-app', {
			useNewUrlParser    : true,
			useUnifiedTopology : true,
			useCreateIndex     : true
		})
		.catch(() => {
			console.log('Could not connect to mongo');
			process.exit(1);
		});
};
