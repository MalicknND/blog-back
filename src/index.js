const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');

app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('successfully connect to database');
  })
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  //la destination de l'image
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  //file
  filename: (req, file, cb) => {
    cb(null, 'image.jpeg');
  },
});
//upload file
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});

//Méthod use route
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

//Méthod launch app
app.listen(process.env.PORT, function () {
  console.log('Server launch');
});
