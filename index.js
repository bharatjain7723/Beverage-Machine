/* Entry point for the project. */

const express = require('express');
const bodyParser = require('body-parser');

const {createMongoConnection} = require('./DB/Mongo/mongoose');

// Create MongoConnection

createMongoConnection()
.then(()=>{
    console.log("Connected to MongoDB server");
})
.catch((err)=>{
    console.log("Cannot connect to mongoDB server", err);
});

const app = express();

app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(bodyParser.json());

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname+ '/views');

const settings = {
    app
};

/*
    index route
*/
require(__dirname + "/Routes/index")(settings);

/*
    Add Ingredient,
    List Ingredients,
    Refill Ingredient
*/
require(__dirname + "/Routes/ingredients")(settings);

/*
    Add Beverages,
    List Beveragess,
    Disperse Beverages
*/
require(__dirname + "/Routes/beverages")(settings);

app.listen(3000);

module.exports = {app};