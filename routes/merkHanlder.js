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

    res.render('merkLijst.pug', {title: "merk lijst", merk_list: allMerk});
});

// toon specifiek merk
exports.merk_detail = asyncHandler(async (req, res, next) => {
    const merk =
        await merkModel.findById(req.params.merkId)
            .exec()

    if (merk === null) {
        // No results.
        const err = new Error("merk not found");
        err.status = 404;
        return next(err);
    }

    res.render("merkDetails", {
        title: merk.merk,
        merk: merk.merk
    });
    // res.send(`NOT IMPLEMENTED: Merk detail: ${req.params.id}`);
});

// toon create form
exports.merk_create_get = asyncHandler(async (req, res, next) => {
    res.sendFile(join(__dirname, '../createMerk.html'));//TODO make file
    // res.send("NOT IMPLEMENTED: Merk create GET");
});

// voeg toe aan db
exports.merk_create_post = [
    body("merk", "merk moet ingevuld zijn.")
        .trim()                      // whitespace in begin en eind verwijderen
        .isLength({min: 1})  // er moet iets ingevuld zijn
        .escape(),                  // sanitation

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const merk = new merkModel({
                merk: req.body.merk
            });
            await merk.save();
            res.redirect(merk.url);
        }
        else {
            res.sendFile(join(__dirname, '../createMerk.html'));
        }
    })
];

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

