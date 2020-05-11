const express = require('express');
const router = new express.Router();
const {
	getUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser
} = require('../services/users-services');

// Creating user
router.post('/api/users', async (req, res) => {
	if (!req.body) {
		return res
			.status(400)
			.json({ message: 'user is missing from request' })
			.end();
	}

	try {
		const user = await addUser(req.body);
		res.status(200).json(user).end();
	} catch (e) {
		res.status(400).send(e);
	}
});

// Reading Users
router.get('/api/users', async (req, res) => {
	try {
		const users = await getUsers();
		res.status(200).json(users).end();
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while loading users' })
			.end();
	}
});

// Reading single user
router.get('/api/users/:id', async (req, res) => {
	try {
		const user = await getUser(req.params.id);

		if (!user) {
			return res.status(404).json({ message: 'user not found' }).end();
		}

		res.status(200).json(user).end();
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while loading user' })
			.end();
	}
});

// Update
router.put('/api/users/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = [
		'name',
		'email',
		'password',
		'age'
	];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).json({ error: 'invalid operation' }).end();
	}

	try {
		const user = await updateUser(req.params.id, req.body);

		if (!user) {
			return res
				.status(404)
				.json({
					message : 'Could not find user while attempting to update'
				})
				.end();
		}

		res.status(200).json(user).end();
	} catch (e) {
		res.status(400).json({ message: 'internal error while updating user' });
	}
});

// Delete
router.delete('/api/users/:id', async (req, res) => {
	try {
		const user = await deleteUser(req.params.id);

		if (!user) {
			return res
				.status(404)
				.json({
					message : 'Could not find user while attempting to delete'
				})
				.end();
		}

		res.status(200).json(user).end();
	} catch (e) {
		res
			.status(500)
			.json({ message: 'internal error while deleting user' })
			.end();
	}
});

module.exports = router;
