const express = require('express');
const { getAllTodos, addTodo } = require('./db');

const app = express();

app.get('/api/todos', function(req, res) {
	getAllTodos((err, todos) => {
		if (err) {
			res
				.status(500)
				.json(
					new Error({
						message : 'internal error while loading todo list'
					})
				)
				.end();
			return;
		}
		res.status(200).json(todos).end();
	});
});

app.post('/api/todos', function(req, res) {
	console.log(req.body);
});

app.listen(3000, () => {
	console.log('Server is running!');
});
