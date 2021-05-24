const mongoose = require('mongoose');
const Beverages = require('../Schema/beverage');

module.exports.addBeverage = (params) => {
    const beverage = new Beverages({
        _id: new mongoose.Types.ObjectId,
        ...params
    });

    return beverage.save();
}

module.exports.updateBeverage = (beverageId, params) => {
    return Beverages.updateOne(
        {_id: beverageId},
        {
            $set: params
        }
    );
}

module.exports.getBeverages = () => {
    return Beverages.find();
}

module.exports.getBeverageById = (beverageId) => {
    return Beverages.findOne(
        {'_id': beverageId}
    )
}