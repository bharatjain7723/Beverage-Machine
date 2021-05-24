const ingredientsController = require('../Components/Ingedients/index');

module.exports = function(settings) {
    var app = settings.app;

    app.post('/api/v1/ingredient', ingredientsController.addIngredient.addIngredient);
    app.get('/api/v1/ingredient', ingredientsController.listIngredients.listIngredients);
    app.post('/api/v1/ingredient/:id', ingredientsController.refillIngredient.refillIngredient);
}