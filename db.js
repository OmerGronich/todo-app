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
		const newTodos = [
			...todos
		];
		newTodo.id = todos[todos.length - 1].id + 1;
		if (!newTodo.date) newTodo.date = new Date().toDateString();
		newTodos.push(newTodo);

		saveTodos(newTodos, err => {
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
function editTodo(id, content, isDone) {
	getAllTodos((err, todos) => {
		if (err) {
			throw err;
		}

		const newTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.content = content;
				todo.isDone = isDone;
			}
			return todo;
		});
		saveTodos(newTodos, noop);
	});
}

function toggleIsDone(id) {
	getAllTodos((err, todos) => {
		if (err) {
			throw err;
		}

		const newTodos = todos.map(todo => {
			if (todo.id === id) {
				todo.isDone = !todo.isDone;
			}
			return todo;
		});

		saveTodos(newTodos, noop);
	});
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

		console.log(newTodos);
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
	showFilteredTodos
};
