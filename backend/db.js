const { readFile, writeFile } = require('fs');

const filePath = './todos.json';

function getTodos(callback) {
	readFile(filePath, (err, data) => {
		console.log('getting todos from file:');
		console.log(data);
		console.log('getting todos from file (json):');
		console.log(JSON.parse(data));
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

function addTodo(todo, callback = noop) {
	getTodos((err, todos) => {
		if (err) {
			callback(err);
			return;
		}
		const newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
		const newTodo = {
			content     : todo.content,
			isDone      : todo.isDone || false,
			id          : newTodoId,
			dateCreated : todo.dateCreated
		};
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

function removeTodo(todoId, callback = noop) {
	getTodos((err, todos) => {
		if (err) {
			callback(err);
			return;
		}
		const updatedTodos = todos.filter(todo => todo.id !== todoId);
		saveTodos(updatedTodos, callback);
	});
}

function editTodo(todoId, todo, callback = noop) {
	getTodos((err, todos) => {
		if (err) {
			callback(err);
			return;
		}
		const todoToEdit = todos.find(todo => todo.id === todoId);

		if (!todoToEdit) {
			callback(new Error('there is no todo with ID: ' + todoId));
			return;
		}

		Object.assign(todoToEdit, todo);

		console.log(`saving file to db: ${JSON.stringify(todos)}`);
		saveTodos(todos, err => {
			if (err) {
				callback(err);
				return;
			}
			callback(null, todoToEdit);
		});
	});
}

function toggleTodoDone(todoId, isDone, callback) {
	editTodo(todoId, { isDone }, callback);
}

module.exports = {
	getTodos,
	addTodo,
	removeTodo,
	editTodo,
	toggleTodoDone
};
