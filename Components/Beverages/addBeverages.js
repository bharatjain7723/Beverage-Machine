const BeveragesModel = require('../../Models/beveragesModel');
const resultWrapper = require('../../Helper/resultWrapper');

module.exports.addBeverage = (req, res, next) => {

    let bevParams = {
        name: req.body.name,
        water: req.body.water,
        coffee: req.body.coffee,
        sugar: req.body.sugar,
        milk: req.body.milk
    }

    try{
        BeveragesModel.addBeverage(bevParams)
        .then(result => {
            let resData = {
                id: result._id,
                name: result.name,
                water: result.water,
                coffee: result.coffee,
                sugar: result.sugar,
                milk: result.milk
            }
            
            resultWrapper.sendOk(res, resData);
        })
        .catch(err => {
            console.log(err);
            resultWrapper.badRequest(res)
        })
    }
    catch(err) {
        resultWrapper.badRequest(res)
    }
}