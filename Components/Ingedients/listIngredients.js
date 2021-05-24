const IngredientsModel = require('../../Models/ingredientsModel');
const resultWrapper = require('../../Helper/resultWrapper');

module.exports.listIngredients = (req, res, next) => {
    try{
        IngredientsModel.getIngredients()
        .then(results => {
            let resData = {
                count: results.length,
                ingredients: results.map(result => {
                    return {
                        id: result._id,
                        name: result.name,
                        units: result.units
                    }
                })
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