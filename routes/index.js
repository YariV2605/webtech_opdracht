var express = require('express');
const {join} = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.cookiePolicy === true) {
        res.sendFile(join(__dirname, '../index.html'));
    }
    else {
        res.sendFile(join(__dirname, '../cookiePolicy.html'));
    }
});

router.post('/', function(req, res, next) {
    req.session.cookiePolicy = true;
    res.sendFile(join(__dirname, '../index.html'));
});

router.get('/fred.mp4', function(req, res, next){
    res.sendFile(join(__dirname, '../public/images/fred.mp4'));
});

module.exports = router;
