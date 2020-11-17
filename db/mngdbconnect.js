'use strict';
const mongoose = require('mongoose');

const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PSSWRD = process.env.MONGODB_PSSWRD;
const MONGODB_HOST = process.env.MONGODB_HOST;
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PSSWRD}@${MONGODB_HOST}/${MONGODB_DBNAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on('error', console.error.bind(console, 'Database connection error:'));
mongoose.connection.once('open', () => console.log('Database connected'));