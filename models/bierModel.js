// Import the mongoose module
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const bierSchema = new Schema({
    naam: {
        type:String,
        required : true
    },
    merk: {
        type: Schema.Types.ObjectId,
        ref: "merk",
        required : true
    },
    // foto: String,                                       //naam van de foto --> moet ook ge-upload kunnen worden
    // percentage: {
    //     type: Number,
    //     required : true
    // },
    // score: Number,
});

bierSchema.virtual('url').get(function() {
    return '/lijst/' + this.merk._id + '/' + this._id; // Customize this based on your needs
});



module.exports = mongoose.model("bier", bierSchema);