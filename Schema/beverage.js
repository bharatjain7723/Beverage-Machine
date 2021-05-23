import mongoose from 'mongoose';

const beveragesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        required: false
    },
    milk: {
        type: Number,
        required: false
    },
    sugarLess: {
        type: Boolean,
        required: true
    },
    milkLess: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.Model('Beverages', beveragesSchema)

