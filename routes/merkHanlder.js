const asyncHandler = require("express-async-handler");
// const {join} = require("path");
const merkModel = require("../models/merkModel");
const bierModel = require("../models/bierModel");
const {join} = require("path");
const {body, validationResult} = require("express-validator");

// toon bierlijst
exports.merk_list = asyncHandler(async (req, res) => {
    const allMerk = await merkModel.find({}, "merk")
        .sort({name : 1})
        .exec()
    let isAdmin = false;
    if(req.session.user){
        isAdmin = req.session.user.isAdmin;
    }
    res.render('merkLijst.pug', {title: "merk lijst", merk_list: allMerk, isAdmin: isAdmin});
});

// toon specifiek merk
exports.merk_detail = asyncHandler(async (req, res, next) => {
    const merk = await merkModel.findById(req.params.merkId)
            .exec();

    const bieren = await bierModel.find({merk: merk})
        .exec();

    if (merk === null) {
        // No results.
        const err = new Error("merk not found");
        err.status = 404;
        return next(err);
    }

    res.render("merkDetails", {
        title: merk.merk,
        merk: merk,
        bier_list: bieren
    });
    // res.send(`NOT IMPLEMENTED: Merk detail: ${req.params.id}`);
});

// toon create form
exports.merk_create_get = asyncHandler(async (req, res, next) => {
    if(req.session.user) {
        if (req.session.user.isAdmin) {
            res.sendFile(join(__dirname, '../createMerk.html'));
        }
    }
    else {
        res.redirect("/lijst");
    }
});

// voeg toe aan db
exports.merk_create_post = [
    body("merk", "merk moet ingevuld zijn.")
        .trim()                      // whitespace in begin en eind verwijderen
        .isLength({min: 1})  // er moet iets ingevuld zijn
        .escape(),                  // sanitation

    body("beschrijving")
        .escape(),

    asyncHandler(async (req, res, next) => {
        if(req.session.user) {
            if (req.session.user.isAdmin) {
                const errors = validationResult(req);
                if (errors.isEmpty()) {
                    const merk = new merkModel({
                        merk: req.body.merk,
                        beschrijvng: req.body.beschrijvng
                    });
                    await merk.save();
                    res.redirect(merk.url);
                } else {
                    res.sendFile(join(__dirname, '../createMerk.html'));
                }
            }
            else {
                let error = new Error("forbidden").status(403);
                return (next(error));
            }
        }
        else {
            let error = new Error("forbidden").status(403);
            return (next(error));
        }
    })
];

// toon delete form
exports.merk_delete_get = asyncHandler(async (req, res, next) => {
    if(req.session.user) {
        if(req.session.user.isAdmin) {
            let merk = await merkModel.findById(req.params.merkId)
                .exec();
            res.render("deleteForm.pug", {title: "delete " + merk.merk, naam: merk.merk});
        }
        else {
            res.redirect("/lijst/" + req.params.merkId);
        }
    }
    else {
        res.redirect("/lijst/" + req.params.merkId);
    }
});

// delete merk uit db
exports.merk_delete_post = asyncHandler(async (req, res, next) => {
    if(req.session.user) {
        if (req.session.user.isAdmin) {
            let merk = await merkModel.findById(req.params.merkId);
            let bieren = await bierModel.find({merk: merk});
            if(bieren.length !== 0) {
                await merkModel.findByIdAndDelete(req.params.merkId).exec();
            }
            res.redirect("/lijst");
        }
        else {
            let error = new Error("forbidden").status(403);
            return (next(error));
        }
    }
    else {
        let error = new Error("forbidden").status(403);
        return (next(error));
    }
});

exports.merk_delete_ajax = asyncHandler(async(req, res, next) => {
    if (req.session.user) {
        if (req.session.user.isAdmin) {
            let merk = await merkModel.findById(req.params.merkId);
            let bieren = await bierModel.find({merk: merk});
            if (bieren.length !== 0) {
                await merkModel.findByIdAndDelete(req.params.merkId).exec();
                res.send("OK");
            }
            else {
                let error = new Error("nog bier in merk").status(403);
                return (next(error));
            }
        }
        let error = new Error("forbidden").status(403);
        return (next(error));
    }
    let error = new Error("forbidden").status(403);
    return (next(error));
});

