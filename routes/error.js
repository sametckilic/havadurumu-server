const express = require('express')
const path = require('path')
const error = express.Router()


error.use(express.static(path.join(__dirname, '../', 'public')));


error.use((req, res, next) => {
    res.status(404).render('404.ejs');
}
);


module.exports = error;