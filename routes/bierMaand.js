var express = require('express');
const {join} = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(join(__dirname, '../bierMaand.html'))
});

module.exports = router;
