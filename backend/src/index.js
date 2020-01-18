const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes');

dotenv.config();
const { MONGO_URL } = process.env;
console.log(MONGO_URL);

const app = express();
try {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
  console.log('connect to database');
} catch (err) {
  console.log('couldnt connect to database');
}
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
