'use strict';
const express = require('express');
const path = require('path');
const url = require('url');
require('./db/mngdbconnect');

const questionRouter = require('./routers/question');
const Question = require('./db/models/question');

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
    await Question.find({}, 'title ans1 ans2 ans3 ans4').then((questions) => {
        questions.sort((elemA, elemB) => elemA.updated < elemB.updated ? 1 : -1);
        questions = questions.slice(0, 4); // only the last 4 updated
        res.render('index', {
            pageTitle: 'Home',  questions: questions, allQuestions: url.format(
                { pathname: `api/questions/all/` })
        });
    });
});

app.get('/create', async (req, res) => {
    res.render('create', {
        pageTitle: 'Create new question', allQuestions: url.format(
            { pathname: `api/questions/all/` })
    });
});

// routing
app.use('/api', questionRouter);

// 404
app.use((req, res) => {
    res.status(404).render('404', {
        pageTitle: '404', allQuestions: url.format(
            { pathname: `api/questions/all/` })
    });
});