const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merkSchema = new Schema({
    merk: {
        type: String,
        required : true
    },
    beschrijving: String,//link naar de site van dit merk
});

merkSchema.virtual('url').get(function() {
    return '/lijst/' + this._id; // Customize this based on your needs
});

module.exports = mongoose.model("merk", merkSchema);