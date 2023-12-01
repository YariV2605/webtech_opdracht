const asyncHandler = require("express-async-handler");
// const {join} = require("path");
const bierModel = require("../models/bierModel");
const merkModel = require("../models/merkModel")
const {join} = require("path");
const { body, validationResult } = require("express-validator");

// toon bierlijst
exports.bier_list = asyncHandler(async (req, res) => {
    const allBier = await bierModel.find({})
        .sort({name : 1})
        .populate("merk")
        .exec()

    res.render('bierLijst.pug', {title: "bier lijst", bier_list: allBier});
});

exports.bier_list_per_merk = asyncHandler(async (req, res) => {
    const selectedMerk = await merkModel.find({_id : req.params.merkId}).exec()
    const merkBier = await bierModel.find({merk: selectedMerk})
       .sort({name : 1})
       .populate("merk")
       .exec()

    res.render('bierLijst.pug', {title: selectedMerk.merk + " lijst", bier_list: merkBier});
});

// toon specifiek bier
exports.bier_detail = asyncHandler(async (req, res, next) => {
    const bier =
        await bierModel.findById(req.params.bierId)
            .populate("merk")
            .exec()

    if (bier === null) {
        // No results.
        const err = new Error("Beer not found");
        err.status = 404;
        return next(err);
    }
    console.log(bier)

    res.render("bierDetails.pug", {
        title: bier.naam,
        bier: bier
    });
});

// toon create form
exports.bier_create_get = asyncHandler(async (req, res, next) => {
    res.sendFile(join(__dirname, '../createBier.html'));//TODO als req.params.merkId niet bestaat --> error
});

// voeg toe aan db
exports.bier_create_post = [
    body("naam", "naam moet ingevuld zijn.")//TODO check op al gebruikte naam
        .trim()                      // whitespace in begin en eind verwijderen
        .isLength({min: 1})  // er moet iets ingevuld zijn
        .escape(),                  // sanitation

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const merk = await merkModel.findById(req.params.merkId).exec();
            const bier = new bierModel({
                naam: req.body.naam,
                merk: merk
            });
            await bier.save();
            res.redirect(bier.url);
        }
        else {
            res.sendFile(join(__dirname, '../createBier.html'));
        }
    })
];

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

