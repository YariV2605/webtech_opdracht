const asyncHandler = require("express-async-handler");
// const {join} = require("path");
const bierModel = require("../models/bierModel");
const merkModel = require("../models/merkModel")
const {join} = require("path");

// toon bierlijst
exports.bier_list = asyncHandler(async (req, res) => {
    const allBier = await bierModel.find({}, "name merk")
        .sort({name : 1})
        .populate("merk")
        .exec()

    res.render('bierLijst', {title: "bier lijst", bier_list: allBier});
});

exports.bier_list_per_merk = asyncHandler(async (req, res) => {
    const selectedMerk = await merkModel.find({_id : req.params.merkId})
    const merkBier = await bierModel.find({merk: selectedMerk}, "name merk")
       .sort({name : 1})
       .populate("merk")
       .exec()

    res.render('bierLijst', {title: selectedMerk.merk + " lijst", bier_list: merkBier});
});

// toon specifiek bier
exports.bier_detail = asyncHandler(async (req, res, next) => {
    const bier =
        await bierModel.findById(req.params.id)
            .populate("merk")
            .exec()

    if (bier === null) {
        // No results.
        const err = new Error("Beer not found");
        err.status = 404;
        return next(err);
    }

    res.render("bierDetails", {
        name: bier.name,
        merk: bier.merk,
    });
    // res.send(`NOT IMPLEMENTED: Bier detail: ${req.params.id}`);
});

// toon create form
exports.bier_create_get = asyncHandler(async (req, res, next) => {
    res.sendFile(join(__dirname, '../createBier.html'));
    // res.send("NOT IMPLEMENTED: Bier create GET");
});

// voeg toe aan db
exports.bier_create_post = asyncHandler(async (req, res, next) => {
    // const merk = ;//TODO get from db
    // const model = new bierModel({name: req.params.naam, merk});
    res.send("NOT IMPLEMENTED: Bier create POST");//TODO bier aan dbb toevoegen
});

// toon delete form
exports.bier_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Bier delete GET");
});

// delete bier uit db
exports.bier_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Bier delete POST");
});

// toon update form
exports.bier_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Bier update GET");
});

// update in db
exports.bier_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Bier update POST");
});

