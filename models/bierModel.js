// Import the mongoose module
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const bierSchema = new Schema({
    name: {
        type:String,
        required : true
    },
    merk: {
        type: Schema.Types.ObjectId,
        ref: "merk",
        required : true
    },
    foto: String,                                       //naam van de foto --> moet ook ge-upload kunnen worden
    percentage: {
        type: Number,
        required : true
    },
    score: Number,
});





module.exports = mongoose.model("bier", bierSchema);