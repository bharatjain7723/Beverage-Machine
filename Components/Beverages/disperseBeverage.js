const BeveragesModel = require('../../Models/beveragesModel');
const IngredientsModel = require('../../Models/ingredientsModel');
const resultWrapper = require('../../Helper/resultWrapper');

module.exports.disperseBeverage = (req, res, next) => {
    let beverageId = req.params.id;
    let beverage = {};
    let currentIngredients = [];
    var updatedIngredients = {};

    try{
        BeveragesModel.getBeverageById(beverageId)
        .then(result => {
            beverage = {
                id: result._id,
                name: result.name,
                water: result.water,
                coffee: result.coffee,
                sugar: result.sugar,
                milk: result.milk
            }

            IngredientsModel.getIngredients()
            .then(async results => {
                results.forEach(result => {
                    currentIngredients.push({
                        id: result._id,
                        name: result.name,
                        units: result.units
                    })
                });

                for(let currentIng of currentIngredients) {
                    let ingName = currentIng.name.toLowerCase();
        
                    if(currentIng.units < beverage[ingName]) {
                        throw new Error("Insufficient Ingredients!")
                    }
                }
        
                function reduceIngredient(ingredientId, ingParams) {
                    IngredientsModel.updateIngredient(ingredientId, ingParams)
                    .then(result => {
                    })
                    .catch(err => {
                        let message = err.message ? err.message : '';
                        resultWrapper.badRequest(res, message);
                    })
                }

                for(let currentIng of currentIngredients) {
                    let ingName = currentIng.name.toLowerCase();
                    let ingredientId = currentIng.id;
                    let ingParams = {
                        units: currentIng.units - beverage[ingName]
                    }
                    const reduced = await reduceIngredient(ingredientId, ingParams);
                    updatedIngredients[currentIng.name] = ingParams.units;
                }
        
                resultWrapper.sendOk(res, updatedIngredients);
            })
            .catch(err => {
                let message = err.message ? err.message : '';
                resultWrapper.badRequest(res, message);
            });
        })
        .catch(err => {
            let message = err.message ? err.message : '';
                resultWrapper.badRequest(res, message);
        })
        
    } catch(err) {
        let message = err.message ? err.message : '';
        resultWrapper.badRequest(res, message);
    }
}