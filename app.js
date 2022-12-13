const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
app.listen(3001);

app.use(cors());

// db connection
const dbConnect = require('./config/dbConnect');


// routes
const index = require('./routes/index.js');
const error = require('./routes/error.js');

app.use('/', index);

app.use(error);




