const asyncHandler = require("express-async-handler");
// const {join} = require("path");
const bierModel = require("../models/bierModel");
const merkModel = require("../models/merkModel");
const userModel = require("../models/userModel")
const {join} = require("path");
const { body, validationResult } = require("express-validator");

// toon bierlijst
exports.bier_list = asyncHandler(async (req, res) => {
    const allBier = await bierModel.find({})
        .sort({name : 1})
        .populate("merk")
        .exec();
    let isAdmin = false;
    if (req.session.user){
        isAdmin = req.session.user.isAdmin;
    }
    res.render('bierLijst.pug', {title: "bier lijst", bier_list: allBier, isAdmin: isAdmin});
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

    res.render("bierDetails.pug", {
        title: bier.naam,
        bier: bier
    });
});

exports.add_to_favorite = asyncHandler(async (req, res, next) => {
    let bier = await bierModel.findById(req.params.bierId).exec();
    if(req.session.user) {
        if (req.session.user.isAdmin) {
            let user = await userModel.findById(req.session.user._id).exec();
            if(!user.favorieten.includes(bier)){
                user.favorieten.push(bier);
                await user.save();
            }
        }
    }
    res.render("bierDetails.pug", {
        title: bier.naam,
        bier: bier
    });
});

// toon create form
exports.bier_create_get = asyncHandler(async (req, res, next) => {
    if(req.session.user) {
        if (req.session.user.isAdmin) {
            res.sendFile(join(__dirname, '../createBier.html'));//TODO als req.params.merkId niet bestaat --> error
        }
    }
    else {
        res.redirect("/lijst/" + req.params.merkId);
    }
});

// voeg toe aan db
exports.bier_create_post = [
    // body("naam", "naam moet ingevuld zijn.")//TODO check op al gebruikte naam
    //     .trim()                      // whitespace in begin en eind verwijderen
    //     .isLength({min: 1})  // er moet iets ingevuld zijn
    //     .escape(),                  // sanitation
    //
    // body("beschrijving")
    //     .escape,

    asyncHandler(async (req, res, next) => {
        console.log("in create post");
        if(req.session.user) {
            console.log("een login");
            if (req.session.user.isAdmin) {
                console.log("een een admin");
                const errors = validationResult(req);
                if (errors.isEmpty()) {
                    const merk = await merkModel.findById(req.params.merkId).exec();
                    const bier = new bierModel({
                        naam: req.body.naam,
                        merk: merk,
                        beschrijving: req.body.beschrijving,
                        foto: req.body.foto
                    });
                    await bier.save();
                    res.redirect(bier.url);
                } else {
                    res.sendFile(join(__dirname, '../createBier.html'));
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
exports.bier_delete_get = asyncHandler(async (req, res, next) => {
    if(req.session.user) {
        if(req.session.user.isAdmin) {
            let bier = await bierModel.findById(req.params.bierId)
                .populate("merk")
                .exec();
            res.render("deleteForm.pug", {title: "delete " + bier.naam, naam: bier.merk.merk + bier.naam});
        }
    }
    res.redirect("/lijst/" + req.params.merkId + "/" + req.params.bierId);
});

// delete bier uit db
exports.bier_delete_post = asyncHandler(async (req, res, next) => {
    if(req.session.user) {
        if (req.session.user.isAdmin) {
            bierModel.findByIdAndDelete(req.params.bierId).exec();
            res.redirect("/lijst/" + req.params.merkId);
        }
    }
    let error = new Error("forbidden").status(403);
    return(next(error));
});

exports.bier_delete_post_ajax = asyncHandler(async (req, res, next) => {
    if(req.session.user) {
        if (req.session.user.isAdmin) {
            bierModel.findByIdAndDelete(req.params.bierId).exec();
            res.send("OK");
        }
    }
    let error = new Error("forbidden").status(403);
    return(next(error));
});