const path = require('path');

const dotenv = require('dotenv');
const cors = require('cors');

const fs = require('fs');
const compression = require('compression');
const morgan = require('morgan');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const noteController = require('./controlles/note');

dotenv.config();

mongoose
  .connect(process.env.DB_URI)
  .then(result => {
    app.listen(process.env.PORT || 3000)
    console.log('========= Connected! =========');
  })
  .catch(err => {
    console.log(`Cannot connect to the PORT!${JSON.stringify(err, undefined, 2)}`);
  });

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(compression());

app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/notes', noteController);