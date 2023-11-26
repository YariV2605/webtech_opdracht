// Import the mongoose module
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const bierSchema = new Schema({
    name: String,
    merk: {type: Schema.Types.ObjectId, ref: "merk"},
    percentage: Number,
    score: Number,
});





module.exports = mongoose.model("bier", bierSchema);