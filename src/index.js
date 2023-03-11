const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('successfully connect to database');
  })
  .catch((err) => console.log(err));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

//Méthod launch app
app.listen(process.env.PORT, function () {
  console.log('Server launch');
});
