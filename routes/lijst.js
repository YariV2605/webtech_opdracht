var express = require('express');
var router = express.Router();

const bierHandler = require("./bierHandler")


router.get('/', bierHandler.bier_list);

router.get('/create', bierHandler.bier_create_get);
router.post('/create', bierHandler.bier_create_post);

router.get('/delete', bierHandler.bier_delete_get);
router.post('/delete', bierHandler.bier_delete_post);

router.get('/update', bierHandler.bier_update_get);
router.post('/update', bierHandler.bier_update_post);

router.get('/:bierId', bierHandler.bier_detail);


module.exports = router;
