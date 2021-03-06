const BeveragesModel = require('../../Models/beveragesModel');
const resultWrapper = require('../../Helper/resultWrapper');

module.exports.listBeverages = (req, res, next) => {
    try{
        BeveragesModel.getBeverages()
        .then(results => {
            let resData = {
                count: results.length,
                beverages: results.map(result => {
                    return {
                        id: result._id,
                        name: result.name,
                        water: result.water,
                        coffee: result.coffee,
                        sugar: result.sugar,
                        milk: result.milk
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