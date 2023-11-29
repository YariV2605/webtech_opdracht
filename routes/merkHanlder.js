const asyncHandler = require("express-async-handler");
// const {join} = require("path");
const merkModel = require("../models/merkModel");
const {join} = require("path");
const { body, validationResult } = require("express-validator");

// toon bierlijst
exports.merk_list = asyncHandler(async (req, res) => {
    const allMerk = await merkModel.find({}, "merk")
        .sort({name : 1})
        .exec()

    res.render('merkLijst', {title: "merk lijst", merk_list: allMerk});
});

// toon specifiek merk
exports.merk_detail = asyncHandler(async (req, res, next) => {
    const merk =
        await merkModel.findById(req.params.id)
            .exec()

    if (bier === null) {
        // No results.
        const err = new Error("merk not found");
        err.status = 404;
        return next(err);
    }

    res.render("bierDetails", {
        name: merk.merk,
    });
    // res.send(`NOT IMPLEMENTED: Merk detail: ${req.params.id}`);
});

// toon create form
exports.merk_create_get = asyncHandler(async (req, res, next) => {
    res.sendFile(join(__dirname, '../createMerk.html'));//TODO make file
    // res.send("NOT IMPLEMENTED: Merk create GET");
});

// voeg toe aan db
exports.merk_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Merk create POST");//TODO merk aan db toevoegen
});

// toon delete form
exports.merk_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Merk delete GET");
});

// delete merk uit db
exports.merk_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Merk delete POST");
});

// toon update form
exports.merk_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Merk update GET");
});

// update in db
exports.merk_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Merk update POST");
});

