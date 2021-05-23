import mongoose from 'mongoose';
import { Ingredients } from '../Schema/ingredient';

export function addIngredient(params) {
    const ingredient = new Ingredients({
        _id: new mongoose.Types.ObjectId,
        ...params
    });

    return ingredient.save();
}

export function updateIngredient(ingredientId, params) {
    return Ingredients.updateOne(
        {_id: ingredientId},
        {
            $set: params
        }
    );
}

export function getIngredients() {
    return Ingredients.find();
}