const express = require('express');
const path = require('path');
const { getTodos, addTodo, removeTodo, editTodo } = require('./db');

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/todos', function(req, res) {
	getTodos(function(err, todos) {
		if (err) {
			res
				.status(500)
				.json({ message: 'internal error while loading todos list' })
				.end();
			return;
		}
		res.status(200).json(todos).end();
	});
});

app.post('/api/todos', function(req, res) {
	if (!req.body || !req.body.content) {
		return res.status(400).json({ message: 'content is missing' }).end();
	}
	addTodo(req.body, function(err, newTodo) {
		if (err) {
			res
				.status(500)
				.json({ message: 'internal error while trying to save todo' })
				.end();
			return;
		}
		res.status(200).json({ data: { newTodo } }).end();
	});
});

app.delete('/api/todos/:todoId', function(req, res) {
	const todoId = Number(req.params.todoId);
	removeTodo(todoId, function(err) {
		if (err) {
			res
				.status(500)
				.json({ message: 'internal error while trying to save todo' })
				.end();
			return;
		}
		res.status(200).json({ success: true }).end();
	});
});

app.put('/api/todos/:todoId', function(req, res) {
	if (!req.body || !req.body.content) {
		return res.status(400).json({ message: 'content is missing' }).end();
	}
	const todoId = Number(req.params.todoId);
	console.log(`editing todo: #${todoId}. with: ${JSON.stringify(req.body)}`);
	editTodo(todoId, req.body, err => {
		if (err) {
			res
				.status(500)
				.json({ message: 'internal error while trying to save todo' })
				.end();
			return;
		}
		res.status(200).json({ success: true }).end();
	});
});

app.listen(3000, () => {
	console.log('Server is up with express!');
});
