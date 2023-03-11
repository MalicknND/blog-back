const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

app.use('/', (req, res) => {
  res.send('Hello World');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('successfully connect to database');
  })
  .catch((err) => console.log(err));

//Méthod launch app
app.listen(process.env.PORT, function () {
  console.log('Server launch');
});
