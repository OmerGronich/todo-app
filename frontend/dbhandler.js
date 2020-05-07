class DB {
	static async fetchTodos() {
		const response = await fetch('/api/todos');
		const todos = await response.json();
		if (todos.length > 0) {
			return todos;
		}

		return [];
	}

	static async addTodo(todo) {
		try {
			const response = await fetch('/api/todo', {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify(todo)
			});
			const data = await response.json();
			console.log('Success!', data);
		} catch (error) {
			console.log('Error', error);
		}
	}

	static async removeTodo(todoId) {
		try {
			const response = await fetch(`/api/todo/${todoId}`, {
				method  : 'DELETE',
				headers : {
					'Content-Type' : 'application/json'
				}
			});
			const data = await response.json();
			return console.log('Success!', data);
		} catch (error) {
			console.log('Error', error);
		}
	}

	static async editTodo(todoId, editedTodo) {
		try {
			const response = await fetch(`/api/todo/${todoId}`, {
				method  : 'PUT',
				headers : {
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify(editedTodo)
			});
			const data = await response.json();
			console.log('Success!', data);
		} catch (error) {
			console.log('Error', error);
		}
	}

	static async replaceTodos(todos) {
		try {
			const response = await fetch('/api/todos', {
				method  : 'PUT',
				headers : {
					'Content-Type' : 'application/json'
				},
				body    : JSON.stringify(todos)
			});
			const data = await response.json();
			console.log('Success!', data);
		} catch (error) {
			console.log('Error', error);
		}
	}
}
