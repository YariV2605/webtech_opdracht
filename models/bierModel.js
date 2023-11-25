// Import the mongoose module
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const bierSchema = new Schema({
    merk: {type: Schema.Types.ObjectId, ref: "merk"},
    name: String,
    percentage: Number,
});



const userSchema = new Schema({
    name: String,
    favorieten: [{type: Schema.Types.ObjectId, ref: "bier"}],
    mail: String,
})

module.exports = mongoose.model("bier", bierSchema);