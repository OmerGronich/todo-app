const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const mongodb = require('./mongodb');

let db;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/frontend')));

// CREATE
app.post('/api/todo', async (req, res) => {
	try {
		const result = await db.collection('todos').insertOne(req.body);
		res.json(result.ops);
	} catch (e) {
		console.error(e);
	}
});

// READ
app.get('/api/todos', async (req, res) => {
	try {
		const result = await db.collection('todos').find({}).toArray();
		res.json(result);
	} catch (e) {
		console.error(e);
	}
});

// UPDATE ALL TODOS (FOR TOGGLE ALL)
app.put('/api/todos', async (req, res) => {
	try {
		const todos = req.body;
		const totalTodos = todos.length;
		const completedTodos = todos.filter(todo => todo.isDone).length;
		if (completedTodos === totalTodos) {
			await db
				.collection('todos')
				.updateMany({}, { $set: { isDone: false } });
		} else {
			await db
				.collection('todos')
				.updateMany({}, { $set: { isDone: true } });
		}
		res.json(todos);
	} catch (e) {
		console.log(e);
	}
});

// UPDATE SINGLE TODO
app.put('/api/todo/:id', async (req, res) => {
	const { content, isDone } = req.body;
	const _id = await mongodb.getID(req.params.id);

	try {
		const result = await db.collection('todos').updateOne(
			{ _id },
			{
				$set : {
					content,
					isDone
				}
			}
		);
		res.json(result.modifiedCount + ' todos successfully modified');
	} catch (e) {
		console.error(e);
	}
});

// DELETE
app.delete('/api/todo/:id', async (req, res) => {
	const _id = mongodb.getID(req.params.id);
	try {
		const result = await db.collection('todos').deleteOne({ _id });
		res.json(result.deletedCount + ' todos successfully deleted');
	} catch (e) {
		console.error(e);
	}
});

mongodb.connect(err => {
	if (err) {
		console.error('Unable to connect to database');
		process.exit(1);
	} else {
		app.listen(3000, async () => {
			db = await mongodb.getDB();
			console.log('connected to database, app litening on port 3000');
		});
	}
});
