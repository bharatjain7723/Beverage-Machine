/* Entry point for the project. */

// import express from 'express';
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

app.listen(3000);