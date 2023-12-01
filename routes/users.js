var express = require('express');
var router = express.Router();

const userHandler = require('./userHandler');


router.get('/', userHandler.user_detail);

router.post('/', userHandler.user_detail_post);

router.get('/signup', userHandler.sign_up);

router.post('/signup', userHandler.sign_up_post);

module.exports = router;
