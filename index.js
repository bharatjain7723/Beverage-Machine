/* Entry point for the project. */

const express = require('express');
const bodyParser = require('body-parser');
const {program} = require('commander');

const {createMongoConnection} = require('./DB/Mongo/mongoose');

// Create MongoConnection

createMongoConnection()
.then(()=>{
    console.log("Connected to MongoDB server");
})
.catch((err)=>{
    console.log("Cannot connect to mongoDB server", err);
});

let mode = "prod";

program
    .version(require('./package.json')['version'])
    .option('-d, --debug', 'run in debug mode')
    .option('-p, --port [value]', 'specify the port number')

program.parse(process.argv);

const options = program.opts();

if((!options.port) || options.port == "") {
    console.log("Please provide the port number");
    console.log("Syntax: node --port <port number>");
    return;
}

if(options.debug) mode = "debug";

const port = options.port || 3000; 

const app = express();

app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(bodyParser.json());

app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('views', __dirname+ '/views');

const settings = {
    app,
    mode
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

app.listen(port);

module.exports = {app};