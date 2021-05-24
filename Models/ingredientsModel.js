const mongoose = require('mongoose');
const Ingredients = require('../Schema/ingredient');

module.exports.addIngredient = (params) => {
    console.log("params are: ", params);
    const ingredient = new Ingredients({
        _id: new mongoose.Types.ObjectId,
        ...params
    });

    console.log(ingredient);

    return ingredient.save();
}

module.exports.updateIngredient = (ingredientId, params) => {
    console.log(ingredientId, params);
    return Ingredients.updateOne(
        {_id: ingredientId},
        {
            $set: params
        }
    );
}

module.exports.getIngredients = () => {
    return Ingredients.find();
}