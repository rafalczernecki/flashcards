const express = require('express');
const bodyParser = require('body-parser');

const flashcardsRoutes = require('./routes/flashcards');

const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/flashcards', flashcardsRoutes);

mongoose
  .connect(
    'mongodb+srv://user:user@cluster0-5maxx.mongodb.net/flashcards?retryWrites=true&w=majority'
  )
  .then(result => {

      app.listen(3000);
  })
  .catch((err) => {
      console.log(err);
  });
