const mongoose = require('mongoose');

const beveragesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    water: {
        type: Number,
        required: true
    },
    coffee: {
        type: Number,
        required: true
    },
    sugar: {
        type: Number,
        required: true
    },
    milk: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Beverages', beveragesSchema)

