const mongoose = require('mongoose');


//Our Schema - beer model
const BeerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['LAGER', 'ALE', 'HYBRID', 'MALT', 'STOUT', 'OTHER'],
        default: 'OTHER'
    },
    style: {
        type: String,
        enum: ['AMBER', 'BLONDE', 'BROWN', 'CREAM', 'DARK', 'PALE', 'STRONG','WHEAT', 'RED','INDIA PALE ALE', 'LIME', 'PILSNER','GOLDEN', 'FRUIT','HONEY','OTHER'],
        default: 'OTHER'
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