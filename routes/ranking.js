var express = require('express');
const {join} = require("path");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.sendFile(join(__dirname, '../ranking.html'))
});

module.exports = router;
