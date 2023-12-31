var express = require('express');
const {join} = require("path");
var router = express.Router();

router.get('/:image', function(req, res, next) {
    res.sendFile(join(__dirname,"../public/images/", req.params.image));
});

module.exports = router;
