'use strict';
const express = require('express');
const Question = require('../db/models/question');
const router = new express.Router();

router.get('/questions/get', async (req, res) => {
    /*     await Question.find({ name: { $regex: req.query.questio.name, $options: 'i' } }, 'title ans1 ans2 ans3 ans4')
        .then( (data) => {
            res.render()
        }); */
});

router.post('/questions/create', async (req, res) => {
    let newQuestion = new Question(req.body.question);
    await Question.find({ title: newQuestion.title }).then(async (data) => {
        if (data.length > 0) {
            res.status(304).send('Question already exists');
        } else {
            await newQuestion.save().then((data) => res.status(201).send(data));
        }
    }).catch((err) => res.status(400).send(err));
});

router.get('/questions/all', async (req, res) => {
    await Question.find({}, 'title ans1 ans2 ans3 ans4')
        .then((data) => {
            res.status(201).send(data);
        });
});

router.patch('/questions/:id', async (req, res) => {
    await Question.update();
});

router.delete('/questions/:id', async (req, res) => {
    await Question.delete();
});

module.exports = router;