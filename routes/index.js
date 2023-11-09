var express = require('express');
const {join} = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(join(__dirname, '../index.html'))
});

module.exports = router;
