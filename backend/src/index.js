const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocker } = require('./websocket');

dotenv.config();
const { MONGO_URL } = process.env;

const app = express();
const server = http.Server(app);

setupWebsocker(server);
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
