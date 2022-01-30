const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.getUserProfile = async (req, res, next) => {
	if (!req.isAuth) {
		return res.status(403).json({ message: 'User Not authorized' });
	}

	const userId = req.userId || null;

	const user = await User.findById(userId);

	if (!user) {
		return res.status(404).json({ user: 'No user found' });
	}
	return res.status(200).json({
		data: {
			firstName: user.firstName,
			lastName: user.lastName,
			address: user.address,
			phone: user.phoneNo,
			email: user.email,
		},
	});
};

exports.postsignup = async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		cpassword,
		phoneNo,
		address,
	} = req.body;

	const errors = validationResult(req);

	const validateErrors = errors.array().map(error => {
		return { value: error.value, msg: error.msg };
	});

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: validateErrors });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = new User({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
			phoneNo: phoneNo,
			address: address,
		});

		await user.save();
		console.log('User Created Sucessfully');

		return res
			.status(201)
			.json({ user: { firstName: user.firstName, _id: user._id } });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something Went Wrong' });
	}
};

exports.postLogin = async (req, res, next) => {
	const { email, password } = req.body;

	const errors = validationResult(req);

	const validateErrors = errors.array().map(error => {
		return { value: error.value, msg: error.msg };
	});

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: validateErrors });
	}

	try {
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(401).json({ error: 'Invalid Email or Password' });
		}

		const isEqual = await bcrypt.compare(password, user.password);

		if (!isEqual) {
			return res.status(401).json({ error: 'Invalid Email or Password' });
		}

		const token = jwt.sign(
			{
				email: user.email,
				id: user._id,
			},
			'This is a seceret',
			{ expiresIn: '1h' }
		);

		res.status(200).json({
			message: 'User Authenticated',
			userId: user._id,
			token: token,
		});
	} catch (err) {
		console.log(err);
	}
};
