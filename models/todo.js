const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', {
	content     : {
		type     : String,
		trim     : true,
		required : true
	},
	isDone      : {
		type    : Boolean,
		default : () => false
	},
	dateCreated : {
		type    : String,
		default : () => new Date().toDateString()
	}
});

module.exports = Todo;
