var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
// var mongo = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');


var app = express();
app.use(cors());

const MongoCLient = require('mongodb').MongoClient;

MongoCLient.connect('mongodb+srv://admin:admin@cluster0.qdibz.mongodb.net/diary?retryWrites=true&w=majority', {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Vi är uppkopplade mot databasen');

    const db = client.db('diary');
    app.locals.db = db;
  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);

module.exports = app;