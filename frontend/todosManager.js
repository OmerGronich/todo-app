class TodosManager {
	constructor() {
		this.todos = Store.getTodos();
	}

	addTodo(content) {
		const todos = Store.getTodos();
		const todo = {
			content,
			dateCreated : new Date().toDateString(),
			isDone      : false,
			id          : todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
		};
		Store.addTodo(todo);
	}

	editTodo(todoId, changedContent) {
		let todos = Store.getTodos();
		todos.forEach(todo => {
			if (todo.id === todoId) {
				todo.content = changedContent;
			}
		});
		Store.saveTodos(todos);
	}

	removeTodo(todoId) {
		let todos = Store.getTodos();
		todos = todos.filter(todo => todo.id !== todoId);
		Store.saveTodos(todos);
	}
	toggleIsDone(todoId) {
		const todos = Store.getTodos();

		todos.forEach(todo => {
			if (todo.id === todoId) {
				todo.isDone = !todo.isDone;
			}
		});
		Store.saveTodos(todos);
	}
	toggleAll() {
		const todos = Store.getTodos();
		const totalTodos = todos.length;
		const completedTodos = todos.filter(todo => todo.isDone).length;
		if (completedTodos === totalTodos) {
			todos.forEach(todo => (todo.isDone = false));
		} else {
			todos.forEach(todo => (todo.isDone = true));
		}

		Store.saveTodos(todos);
	}
}
