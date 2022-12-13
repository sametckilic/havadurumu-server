const express = require('express')
const path = require('path')
const index = express.Router()
const MainController = require('../controllers/MainController.js');



index.use(express.static(path.join(__dirname, '../', 'public')));

index.get('/', MainController.getIndex);

index.get('/:city',MainController.getCity);




module.exports = index;