const express = require('express');
const router = new express.Router();

const {
	getTodos,
	addTodo,
	removeTodo,
	editTodo,
	toggleAll
} = require('../services/todos-services');

// CREATE
router.post('/api/todo', async (req, res) => {
	if (!req.body || !req.body.content) {
		return res.status(400).json({ message: 'content is missing' }).end();
	}
	try {
		const todo = await addTodo(req.body);
		res.status(200).json(todo).end();
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while trying to save todo' })
			.end();
	}
});

// READ
router.get('/api/todos', async (req, res) => {
	try {
		const todos = await getTodos();
		res.status(200).json(todos).end();
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while loading todos list' })
			.end();
	}
});

// UPDATE ALL TODOS (FOR TOGGLE ALL)
router.put('/api/todos', async (req, res) => {
	try {
		const todos = req.body;
		const editedTodos = await toggleAll(todos);
		res.json(editedTodos);
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while toggling todos list' })
			.end();
	}
});

// UPDATE SINGLE TODO
router.put('/api/todo/:id', async (req, res) => {
	try {
		const todo = await editTodo(req.params.id, req.body);
		res.status(200).json(todo).end();
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while trying to update todo' })
			.end();
	}
});

// DELETE
router.delete('/api/todo/:id', async (req, res) => {
	try {
		await removeTodo(req.params.id);
		res.status(200).json({ success: true }).end();
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while trying to save todo' })
			.end();
	}
});

module.exports = router;
