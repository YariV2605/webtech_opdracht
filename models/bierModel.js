// Import the mongoose module
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const bierSchema = new Schema({
    name: String,
    merk: {type: Schema.Types.ObjectId, ref: "merk"},
    foto: String,                                       //naam van de foto --> moet ook ge-upload kunnen worden
    percentage: Number,
    score: Number,
});





module.exports = mongoose.model("bier", bierSchema);