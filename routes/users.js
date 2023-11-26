var express = require('express');
var router = express.Router();

const userHandler = require('./userHandler');


router.get('/', userHandler.user_detail);

module.exports = router;
