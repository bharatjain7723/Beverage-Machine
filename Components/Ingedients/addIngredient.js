const IngredientsModel = require('../../Models/ingredientsModel');
const resultWrapper = require('../../Helper/resultWrapper');

module.exports.addIngredient = (res, req, next) => {
    let ingParams = {
        name: req.body.name
    }

    try{
        IngredientsModel.addIngredient(ingParams)
        .then(result => {
            let resData = {
                id: result._id,
                name: result.name,
                units: result.units
            }
            resultWrapper.sendOk(res, resData);
        })
        .catch(err => {
            resultWrapper.badRequest(res)
        })
    }
    catch(err) {
        resultWrapper.badRequest(res)
    }
}