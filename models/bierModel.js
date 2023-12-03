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
    aantalVotes: {
        type: Number,
        required: true,
        default: 0
    },
    score: {
        type : Number,
        required : true,
        default : 0
    },
    foto: String,                                       //naam van de foto --> moet ook ge-upload kunnen worden
    // percentage: {
    //     type: Number,
    //     required : true
    // },
    beschrijving: {
        type: String
    }
    // score: Number,
});

bierSchema.virtual('url').get(function() {
    return '/lijst/' + this.merk._id + '/' + this._id; // Customize this based on your needs
});

bierSchema.virtual('rating').get(function() {
   return this.score/this.aantalVotes;
});



module.exports = mongoose.model("bier", bierSchema);