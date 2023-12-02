var express = require('express');
var router = express.Router();

const bierHandler = require("./bierHandler")
const merkHandler = require("./merkHanlder")


router.get('/', merkHandler.merk_list);

router.get('/create', merkHandler.merk_create_get);
router.post('/create', merkHandler.merk_create_post);

router.get('/bier', bierHandler.bier_list);

router.get('/:merkId', merkHandler.merk_detail);


router.get('/:merkId/create', bierHandler.bier_create_get);
router.post('/:merkId/create', bierHandler.bier_create_post);

router.get('/:merkId/delete', merkHandler.merk_delete_get);
router.post('/:merkId/delete', merkHandler.merk_delete_post);

router.get('/:merkId/:bierId/delete', bierHandler.bier_delete_get);
router.post('/:merkId/:bierId/delete', bierHandler.bier_delete_post);

router.get('/:merkId/:bierId', bierHandler.bier_detail);


module.exports = router;
