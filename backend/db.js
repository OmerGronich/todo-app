const { readFile, writeFile } = require('fs');

const filePath = './todos.json';

// See todos
function getAllTodos(callback) {
	readFile(filePath, (err, data) => {
		if (err) {
			callback(err);
			return;
		}

		callback(null, JSON.parse(data));
	});
}

function saveTodos(todos, callback) {
	writeFile(filePath, JSON.stringify(todos), 'utf8', callback);
}

function noop() {}

// Add todo
function addTodo(todo, callback = noop) {
	getAllTodos((err, todos) => {
		if (err) {
			callback(err);
			return;
		}
		const newTodo = { ...todo };
		newTodo.id = todos[todos.length - 1].id + 1;
		if (!newTodo.dateCreated) newTodo.dateCreated = new Date();

		todos.push(newTodo);

		saveTodos(todos, err => {
			if (err) {
				callback(err);
				return;
			}
			callback(null, newTodo);
		});
	});
}

// remove todo
function removeTodo(id, callback = noop) {
	getAllTodos((err, todos) => {
		if (err) {
			callback(err);
			return;
		}

		const updatedTodos = todos.filter(todo => todo.id !== id);
		saveTodos(updatedTodos, callback);
	});
}

// edit todo
function editTodo(id, todo, callback) {
	getAllTodos((err, todos) => {
		if (err) {
			callback(err);
			return;
		}

		const todoToEdit = todos.find(todo => todo.id === id);

		if (!todoToEdit) {
			callback(new Error('There is no todo with ID: ' + id));
			return;
		}

		Object.assign(todoToEdit, todo);

		saveTodos(todos, err => {
			if (err) {
				callback(err);
				return;
			}
			callback(null, todoToEdit);
		});
	});
}

function toggleIsDone(id, isDone, callback) {
	editTodo(id, { isDone }, callback);
}

function showFilteredTodos(isDoneStatus) {
	getAllTodos((err, todos) => {
		if (err) {
			throw err;
		}

		const newTodos = todos.filter(todo => {
			if (todo.isDone === isDoneStatus) {
				return todo;
			}
		});

		return newTodos;
	});
}

// addTodo({ content: 'to remove', isDone: true });
// removeTodo(9);
// editTodo(4, 'add ability to edit todo', true);
// toggleIsDone(6);
// showFilteredTodos(true);

module.exports = {
	getAllTodos,
	addTodo,
	removeTodo,
	toggleIsDone,
	showFilteredTodos,
	editTodo
};
