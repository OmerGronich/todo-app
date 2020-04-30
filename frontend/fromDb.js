async function fetchTodos() {
	const response = await fetch('http://localhost:3000/api/todos', {
		mode : 'no-cors'
	});
	const data = await response.json();
	console.log(data);
}
