// Import the mongoose module
const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    favorieten: [{type: Schema.Types.ObjectId, ref: "bier"}],
    mail: String,
})

module.exports = mongoose.model("user", userSchema);