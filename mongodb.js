// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'todo-app';

let db;

const id = new ObjectID();

const connect = callback => {
	if (db) {
		callback();
	} else {
		MongoClient.connect(
			connectionURL,
			{
				useNewUrlParser    : true,
				useUnifiedTopology : true
			},
			(error, client) => {
				if (error) {
					return console.log('Unable to connect to database');
				}

				db = client.db(databaseName);
				callback();
			}
		);
	}
};

const getID = id => {
	return new ObjectID(id);
};

const getDB = () => {
	return db;
};

module.exports = {
	getID,
	getDB,
	connect
};

// ------- Create
// db
// .collection('todos')
// .insertOne({
//   content : 'Walk the dog',
//   isDone  : false
// })
// .then(result => console.log(result.ops))
// .catch(error => console.log(error));

// ------- Read

// db
// .collection('todos')
// .find({})
// .toArray()
// .then(result => console.log(result))
// .catch(error => console.log('Unable to read todos'));

// ------- Update

// db
// 			.collection('todos')
// 			.updateOne(
// 				{
// 					_id : new ObjectID('5eb1f1b513ebca0d9d09925d')
// 				},
// 				{
// 					$set : {
// 						content : 'Go to sleep...',
// 						isDone  : true
// 					}
// 				}
// 			)
// 			.then(result => console.log(result.modifiedCount))
// 			.catch(error => console.log(error));

// ------- Delete

// db
// .collection('todos')
// .deleteOne({ _id: new ObjectID('5eb1f9793fe1be0ee741a2aa') })
// .then(result => console.log(result.deletedCount))
// .catch(error => console.log(error));
