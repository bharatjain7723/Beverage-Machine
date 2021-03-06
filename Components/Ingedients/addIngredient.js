const IngredientsModel = require('../../Models/ingredientsModel');
const resultWrapper = require('../../Helper/resultWrapper');

module.exports.addIngredient = (req, res, next) => {
    let ingParams = {
        name: req.body.name,
        units: req.body.units
    }

    console.log(req.body, ingParams);

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