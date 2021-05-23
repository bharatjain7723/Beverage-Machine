import mongoose from 'mongoose';
import { Beverages } from '../Schema/beverage';

export function addBeverage(params) {
    const beverage = new Beverages({
        _id: new mongoose.Types.ObjectId,
        ...params
    });

    return beverage.save();
}

export function updateBeverage(beverageId, params) {
    return Beverages.updateOne(
        {_id: beverageId},
        {
            $set: params
        }
    );
}

export function getBeverages() {
    return Beverages.find();
}