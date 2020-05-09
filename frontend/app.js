// DOM SELECTION
const addTodoInput = document.querySelector('#add-todo');

// Init new Todos Manager
const todosManager = new TodosManager();

// Event Listeners

// Initializing app
document.addEventListener('DOMContentLoaded', async () => {
	await todosManager.setTodos();
	UI.renderTodoList();
});

// Submit todo event
addTodoInput.addEventListener('keydown', async e => {
	if (e.keyCode === 13) {
		await todosManager.addTodo(e.target.value);
		e.target.value = '';
		UI.renderTodoList();
	}
});

// Remove todo event
document.addEventListener('click', e => {
	if (e.target.id === 'remove-todo') {
		const todoId = e.target.parentElement.parentElement.dataset.id;
		todosManager.removeTodo(todoId);
		UI.renderTodoList();
	}
});

// Toggle done status
document.addEventListener('click', e => {
	if (e.target.id === 'completed' || e.target.id === 'not-completed') {
		const todoId = e.target.parentElement.parentElement.dataset.id;
		todosManager.toggleIsDone(todoId);
		UI.renderTodoList();
	}
});

// Toggle All
document.addEventListener('click', async e => {
	if (e.target.id === 'toggle-all') {
		await todosManager.toggleAll();
		UI.renderTodoList();
	}
});

// Edit todo on dblclick
document.querySelector('.list').addEventListener('dblclick', e => {
	if (e.target.classList.contains('list-item__content')) {
		const li = e.target.parentElement.parentElement;
		li.classList.add('box-shadow-inset');
		const todos = todosManager.todos;
		todos.forEach(todo => {
			if (todo._id === li.dataset.id) {
				// Is done icon
				let isDoneIcon = todo.isDone
					? '<i id="completed" class="far fa-check-circle btn btn--toggle-one"></i>'
					: '<i id="not-completed" class="far fa-circle btn btn--toggle-one"></i>';

				// Adding input element to html
				li.innerHTML = `
					<div class="list-item__left">
						<span class="hidden">${isDoneIcon}</span>
						<input class="list-item__input" type="text" value="${todo.content}">
					</div>`;

				const input = li.querySelector('input');
				input.focus();

				// Checking for enter key press(recreate submit event)
				input.addEventListener('keydown', e => {
					if (e.keyCode === 13) {
						li.innerHTML = `<div class="list-item__left">${isDoneIcon} <div class="list-item__content">${e
							.target
							.value}</div></div><div class="list-item__right"><em class="list-item__date">${todo.dateCreated}</em><i id="remove-todo" class="fas fa-times btn btn--remove"></div>`;

						li.classList.remove('box-shadow-inset');
						todosManager.editTodo(todo._id, e.target.value);
						input.blur();
					}
				});

				// Checking for exiting the focused state
				input.addEventListener('blur', e => {
					li.innerHTML = `
						<div class="list-item__left">
							${isDoneIcon} 
							<div class="list-item__content">${e.target.value}</div>
						</div>
						<div class="list-item__right">
							<em class="list-item__date">${todo.dateCreated}</em>
							<i id="remove-todo" class="fas fa-times btn btn--remove">
						</div>`;
					li.classList.remove('box-shadow-inset');

					todosManager.editTodo(todo._id, e.target.value);
				});
			}
		});
	}
});

// Add strikethrough to li content when todos are done
list.addEventListener('change', () => {
	UI.checkIfDone();
});
