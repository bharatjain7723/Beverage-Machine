const IngredientsModel = require('../../Models/ingredientsModel');
const resultWrapper = require('../../Helper/resultWrapper');

module.exports.refillIngredient = (req, res, next) => {
    let ingredientId = req.params.id;
    let ingParams = {
        units: req.body.units
    }

    try{
        IngredientsModel.updateIngredient(ingredientId, ingParams)
        .then(result => {
            let resData = {
                id: ingredientId,
                ...ingParams
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