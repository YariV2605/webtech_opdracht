const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merkSchema = new Schema({
    merk: String,
    site: String,//link naar de site van dit merk
});

module.exports = mongoose.model("merk", merkSchema);