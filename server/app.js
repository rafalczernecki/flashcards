const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');

const flashcardsRoutes = require('./routes/flashcards');

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

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


mongoose
  .connect(
    'mongodb+srv://user:FxqM6KLyIGqVTmaw@cluster0-5maxx.mongodb.net/flashcards?retryWrites=true&w=majority'
  )
  .then(result => {
      app.listen(3000);
  })
  .catch((err) => {
      console.log(err);
  });
