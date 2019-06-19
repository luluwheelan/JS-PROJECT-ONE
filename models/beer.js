const mongoose = require('mongoose');


//Our Schema - beer model
const BeerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: false
    },
    brewery: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    tester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tester',
        required:true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Beer', BeerSchema);