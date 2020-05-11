const mongoose = require('mongoose');
const Todo = require('../models/todo');

function getTodos() {
	return Todo.find({});
}

function addTodo(todo) {
	todo = new Todo(todo);
	return todo.save();
}

function removeTodo(todoId) {
	return Todo.findByIdAndRemove(todoId);
}

async function editTodo(todoId, newData = {}) {
	const todo = await Todo.findById(todoId);
	Object.assign(todo, newData);
	return todo.save();
}

function toggleAll(todos) {
	const totalTodos = todos.length;
	const completedTodos = todos.filter(todo => todo.isDone).length;
	if (completedTodos === totalTodos) {
		return Todo.updateMany({}, { isDone: false });
	} else {
		return Todo.updateMany({}, { isDone: true });
	}
}

module.exports = {
	getTodos,
	addTodo,
	removeTodo,
	editTodo,
	toggleAll
};
