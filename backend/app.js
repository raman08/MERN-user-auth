const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(
	cors({
		origin: '*',
		optionsSuccessStatus: 200,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
	})
);

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

mongoose
	.connect(
		'mongodb+srv://admin:admin12345@mern-auth-ititech.gusxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log('[App.js] Connected To database');
	})
	.catch(err => {
		console.log(err);
	});

app.listen(8000, () => {
	console.log('[App.js] Server Started at http://localhost:8000');
});
