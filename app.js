const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
    .once('open', () => {
        console.log('Database connected')
    })
    .on('error', error => {
        console.log('My error', error)
    });

app.use(express.json());

app.use('/form', authRoute);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('I am connected')
});