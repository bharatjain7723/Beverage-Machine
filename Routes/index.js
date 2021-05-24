module.exports = function(settings) {
    const app = settings.app;

    app.get('/', indexRoute);
}

const indexRoute = (req, res, next) => {
    res.render('index', {
        title: 'Beverages Services'
    })
}