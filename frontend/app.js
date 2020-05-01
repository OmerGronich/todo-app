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
addTodoInput.addEventListener('keydown', e => {
	if (e.keyCode === 13) {
		todosManager.addTodo(e.target.value);
		e.target.value = '';
		UI.renderTodoList();
	}
});

// Remove todo event
document.addEventListener('click', e => {
	if (e.target.id === 'remove-todo') {
		const todoId = +e.target.parentElement.dataset.id;
		todosManager.removeTodo(todoId);
		UI.renderTodoList();
	}
});

// Toggle done status
document.addEventListener('click', e => {
	if (e.target.id === 'completed' || e.target.id === 'not-completed') {
		const todoId = +e.target.parentElement.dataset.id;
		todosManager.toggleIsDone(todoId);
		UI.renderTodoList();
	}
});

// Toggle All
document.addEventListener('click', e => {
	if (e.target.id === 'toggle-all') {
		todosManager.toggleAll();
		UI.renderTodoList();
	}
});

// Edit todo on dblclick
document.querySelector('.list').addEventListener('dblclick', e => {
	if (e.target.dataset.id) {
		const li = e.target;
		const todos = todosManager.todos;
		todos.forEach(todo => {
			if (todo.id === +e.target.dataset.id) {
				// Is done icon
				let isDoneIcon = todo.isDone
					? '<i id="completed" class="far fa-check-circle"></i>'
					: '<i id="not-completed" class="far fa-circle"></i>';

				// Adding input element to html
				li.innerHTML = `${isDoneIcon} <input type="text" value="${todo.content}" > | <em>${todo.dateCreated}</em> <i id="remove-todo" class="fas fa-times">`;
				const input = li.querySelector('input');
				input.focus();

				// Checking for enter key press(recreate submit event)
				input.addEventListener('keydown', e => {
					if (e.keyCode === 13) {
						li.innerHTML = `${isDoneIcon} ${e.target
							.value} | <em>${todo.dateCreated}</em> <i id="remove-todo" class="fas fa-times">`;
						todosManager.editTodo(todo.id, e.target.value);
						input.blur();
					}
				});

				// Checking for exiting the focused state
				input.addEventListener('blur', e => {
					li.innerHTML = `${isDoneIcon} ${e.target
						.value} | <em>${todo.dateCreated}</em> <i id="remove-todo" class="fas fa-times">`;
					todosManager.editTodo(todo.id, e.target.value);
				});
			}
		});
	}
});
