class TodosManager {
	async setTodos() {
		this.todos = await DB.fetchTodos();
	}

	async addTodo(content) {
		if (!content) {
			return;
		}
		const todo = {
			content,
			dateCreated : new Date().toDateString(),
			isDone      : false
		};
		await DB.addTodo(todo);
		await this.setTodos();
	}

	async editTodo(todoId, changedContent) {
		const editedTodo = this.todos.find(todo => todo._id === todoId);
		editedTodo.content = changedContent;
		await DB.editTodo(todoId, editedTodo);
	}

	async removeTodo(todoId) {
		this.todos = this.todos.filter(todo => todo._id !== todoId);
		await DB.removeTodo(todoId);
	}

	async toggleIsDone(todoId) {
		const editedTodo = this.todos.find(todo => todo._id === todoId);
		editedTodo.isDone = !editedTodo.isDone;
		await DB.editTodo(todoId, editedTodo);
	}

	async toggleAll() {
		const todos = this.todos;
		await DB.replaceTodos(todos);
		await this.setTodos();
	}
}
