class TodosManager {
	async setTodos() {
		this.todos = await DB.fetchTodos();
	}

	addTodo(content) {
		if (!content) {
			return;
		}
		const todos = todosManager.todos;
		const todoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
		const todo = {
			content,
			dateCreated : new Date().toDateString(),
			isDone      : false,
			id          : todoId
		};
		this.todos.push(todo);
		DB.addTodo(todo);
	}

	editTodo(todoId, changedContent) {
		const editedTodo = todosManager.todos.find(todo => todo.id === todoId);
		editedTodo.content = changedContent;
		DB.editTodo(todoId, editedTodo);
	}

	removeTodo(todoId) {
		this.todos = this.todos.filter(todo => todo.id !== todoId);
		DB.removeTodo(todoId);
	}
	toggleIsDone(todoId) {
		const editedTodo = todosManager.todos.find(todo => todo.id === todoId);
		editedTodo.isDone = !editedTodo.isDone;

		DB.editTodo(todoId, editedTodo);
	}

	toggleAll() {
		const todos = todosManager.todos;
		const totalTodos = todos.length;
		const completedTodos = todos.filter(todo => todo.isDone).length;
		if (completedTodos === totalTodos) {
			todos.forEach(todo => {
				todo.isDone = false;
				// await DB.editTodo(todo.id, todo);
			});
		} else {
			todos.forEach(todo => {
				todo.isDone = true;
				// await DB.editTodo(todo.id, todo);
			});
		}
	}
}
