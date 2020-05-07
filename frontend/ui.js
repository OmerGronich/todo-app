const list = document.querySelector('.list');
const toggleAllBtn = document.querySelector('#toggle-all');

class UI {
	static clearList() {
		list.innerHTML = '';
	}

	static async renderTodoList() {
		UI.clearList();

		const todos = todosManager.todos;

		if (todos.length > 0) {
			todos.forEach(todo => {
				const todoLiElement = document.createElement('li');
				todoLiElement.dataset.id = todo._id;
				let isDoneIcon = todo.isDone
					? '<i id="completed" class="far fa-check-circle"></i>'
					: '<i id="not-completed" class="far fa-circle"></i>';

				todoLiElement.innerHTML = `${isDoneIcon} ${todo.content} | <em>${todo.dateCreated}</em> <i id="remove-todo" class="fas fa-times">`;

				list.append(todoLiElement);
				toggleAllBtn.style.display = 'inline-block';
			});
		} else {
			toggleAllBtn.style.display = 'none';
		}
	}
}
