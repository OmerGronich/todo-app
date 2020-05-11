const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { port } = require('./config');
const connect = require('./db');

const userRouter = require('./routers/user');
const todoRouter = require('./routers/todo');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);
app.use(todoRouter);

app.use(express.static(path.join(__dirname, '/frontend')));

connect().then(() => {
	console.log('DB is connected');
	app.listen(port, () => {
		console.log('Server is up with express on port: ', port);
	});
});
