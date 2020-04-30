class Store {
	static getTodos() {
		fetchTodos();
		let todos;
		if (localStorage.getItem('todoList') === null) {
			todos = [];
		} else {
			todos = JSON.parse(localStorage.getItem('todoList'));
		}
		return todos;
	}

	static addTodo(todo) {
		const todos = Store.getTodos();
		todos.push(todo);
		Store.saveTodos(todos);
	}

	static saveTodos(todos) {
		localStorage.setItem('todoList', JSON.stringify(todos));
	}
}
