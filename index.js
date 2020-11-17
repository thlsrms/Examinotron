'use strict';
const express = require('express');
const path = require('path');
require('./db/mngdbconnect');

const questionRouter = require('./routers/question');

const port = process.env.PORT || 3000;
// express app
const app = express();

// listen for requests
app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Listening to port ${port}`);
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// endpoints
app.get('/', async (req, res) => {
    res.render('index', { pageTitle: 'Home' });
});

app.get('/create', async (req, res) => {
    res.render('create', { pageTitle: 'Create new question'});
});

// routing
app.use('/api', questionRouter);

// 404
app.use((req, res) => {
    res.status(404).render('404', { pageTitle: '404' });
});