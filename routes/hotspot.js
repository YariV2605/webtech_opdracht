var express = require('express');
const {join} = require("path");
var router = express.Router();
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile(join(__dirname, '../hotspot.html'))
});

router.get('/artikel1', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile(join(__dirname, '../public/text/artikel1.html'))
});

router.get('/artikel2', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile(join(__dirname, '../public/text/artikel2.html'))
});
router.get('/artikel3', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile(join(__dirname, '../public/text/artikel3.html'))
});
router.get('/artikel4', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile(join(__dirname, '../public/text/artikel4.html'))
});

module.exports = router;