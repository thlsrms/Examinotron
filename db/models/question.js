'use strict';
const mongoose = require('mongoose');

const Question = mongoose.model('Question', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ans1: {
        type: String,
        required: true,

    },
    ans2: {
        type: String,
        required: true
    },
    ans3: {
        type: String,
        required: true
    },
    ans4: {
        type: String,
        required: true
    },
    correctAns: {
        type: String,
        required: true
    },
}));

module.exports = Question;