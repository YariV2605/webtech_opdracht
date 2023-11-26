const user = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {join} = require("path");


// display user page van logged in user
exports.user_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: user detail: ${req.params.id}`);
});

// toon create form om een nieuwe user aan te maken
exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user create GET");
});

// nieuwe user in db
exports.user_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user create POST");
});

// delete user form
exports.user_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user delete GET");
});

// delete user from db
exports.user_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user delete POST");
});

// toon user update form --> TODO in user info??
exports.user_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user update GET");
});

// update user info in db
exports.user_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: user update POST");
});

