const list = document.querySelector('.list');
const toggleAllBtn = document.querySelector('#toggle-all');

class UI {
	static clearList() {
		list.innerHTML = '';
	}

	static checkIfDone() {
		[
			...list.children
		].forEach(li => {
			if (li.querySelector('#completed')) {
				li.querySelector('.list-item__content').style.textDecoration =
					'line-through';
				li.querySelector('.list-item__content').style.opacity = '0.6';
			}
		});
	}

	static async renderTodoList() {
		UI.clearList();

		const todos = todosManager.todos;

		if (todos.length > 0) {
			todos.forEach(todo => {
				const todoLiElement = document.createElement('li');
				todoLiElement.dataset.id = todo._id;
				todoLiElement.classList.add('list-item');
				let isDoneIcon = todo.isDone
					? '<i id="completed" class="far fa-check-circle btn btn--toggle-one"></i>'
					: '<i id="not-completed" class="far fa-circle btn btn--toggle-one"></i>';

				todoLiElement.innerHTML = `
					<div class="list-item__left">
						${isDoneIcon}
						<div class="list-item__content">${todo.content}</div>
					</div>
					<div class="list-item__right">
						<em class="list-item__date">${todo.dateCreated}</em>
						<i id="remove-todo" class="fas fa-times btn btn--remove">
					</div>`;

				list.append(todoLiElement);
				toggleAllBtn.style.display = 'inline-block';
			});
		} else {
			toggleAllBtn.style.display = 'none';
		}

		UI.checkIfDone();
	}
}
