const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required : true
    },

    favorieten: [{type: Schema.Types.ObjectId, ref: "bier"}],

    salt:{
        type: String,
        required: true
    },

    passwordHash: {
        type: String,
        required : true
    },

    isAdmin:{
        type: Boolean,
        required : true,
        default : false
    }
})

module.exports = mongoose.model("user", userSchema);