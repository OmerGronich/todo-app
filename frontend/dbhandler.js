class DB {
	static async fetchTodos() {
		const response = await fetch('http://localhost:3000/api/todos');
		const todos = await response.json();
		if (todos.length > 0) {
			return todos;
		} else {
			return [];
		}
	}

	static async addTodo(todo) {
		try {
			const response = await fetch('http://localhost:3000/api/todos', {
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
			const response = await fetch(
				`http://localhost:3000/api/todos/${todoId}`,
				{
					method  : 'DELETE',
					headers : {
						'Content-Type' : 'application/json'
					}
				}
			);
			const data = await response.json();
			console.log('Success!', data);
		} catch (error) {
			console.log('Error', error);
		}
	}

	static async editTodo(todoId, editedTodo) {
		try {
			const response = await fetch(
				`http://localhost:3000/api/todos/${todoId}`,
				{
					method  : 'PUT',
					headers : {
						'Content-Type' : 'application/json'
					},
					body    : JSON.stringify(editedTodo)
				}
			);
			const data = await response.json();
			console.log('Success!', data);
		} catch (error) {
			console.log('Error', error);
		}
	}
}
