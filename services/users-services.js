const mongoose = require('mongoose'),
	User = require('../models/user');

function getUsers() {
	return User.find({});
}

function getUser(userId) {
	return User.findById(userId);
}
function addUser(user) {
	user = new User(user);
	return user.save();
}

function updateUser(userId, updates) {
	return User.findByIdAndUpdate(userId, updates, {
		new            : true,
		runValidatiors : true
	});
}

function deleteUser(userId) {
	return User.findByIdAndDelete(userId);
}
module.exports = {
	getUsers,
	addUser,
	getUser,
	updateUser,
	deleteUser
};
