const beveragesController = require('../Components/Beverages/index');

module.exports = function(settings) {
    var app = settings.app;

    app.post('/api/v1/beverage', beveragesController.addBeverages.addBeverage);
    app.get('/api/v1/beverage', beveragesController.listBeverages.listBeverages);
    app.get('/api/v1/beverage/:id', beveragesController.disperseBeverage.disperseBeverage);
}