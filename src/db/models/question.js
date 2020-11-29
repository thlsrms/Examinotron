'use strict';
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
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
    updated: {
        type: Date,
        required: true,
    }
});

postSchema.pre('validate', function(next) {
    if (this.isNew) {
        this.updated = Date.now()
        next();
    }
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;