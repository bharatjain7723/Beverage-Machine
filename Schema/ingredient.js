const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    units: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchema)

