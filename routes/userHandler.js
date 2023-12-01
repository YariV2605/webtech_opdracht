const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {join} = require("path");
const { body, validationResult } = require("express-validator");
// const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;


// display user page van logged in user
exports.user_detail = asyncHandler(async (req, res, next) => {
    if(req.session.user){
        console.log(req.session.user);
        console.log('fav: ', req.session.user.favorieten);
        res.render("userDetails.pug", {userObj: req.session.user});
    }
    res.sendFile(join(__dirname, '../login.html'));
});

exports.user_detail_post = [
    body('naam')
        .escape(),
    body('password')
        .escape(),
    async(req, res, next) => {
        let errors = validationResult(req);
        let user = await userModel.findOne({userName: req.body.userName})
            .populate("favorieten")
            .exec();
        let hashedPassword = bcrypt.hashSync(req.body.password, user.salt);
        let authenticated = hashedPassword === user.passwordHash;
        if(errors.isEmpty() && authenticated) {
            req.session.user = user;
        }
        res.redirect('/users');
    }
];

exports.sign_up = asyncHandler(async (req, res, next) => {
    res.sendFile(join(__dirname, '../signup.html'));
});




exports.sign_up_post = [
    body('userName')
        .trim()
        .isLength({min: 1})
        .escape(),

    body('password', 'wachtwoorden komen niet overeen')
        .isLength({min: 1})
        .escape(),

    asyncHandler(async(req, res, next) => {
        if(req.session.user){
            res.session.destroy();
        }
        let errors = validationResult(req);
        if (errors.isEmpty() && req.body.password === req.body.password2) {
            let salt = bcrypt.genSaltSync(saltRounds);
            let hashedPassword = bcrypt.hashSync(req.body.password, salt);
            let fav = []
            let user = new userModel({
                userName: req.body.userName,
                favorieten: fav,
                salt : salt,
                passwordHash: hashedPassword
            });
            await user.save();
            user = await userModel.findById(user._id)
                .populate("favorieten")
                .exec();
            req.session.user = user;
            res.redirect('/users');
        }
        else {
            res.sendFile(join(__dirname, '../signup.html'));
        }
    })
];
