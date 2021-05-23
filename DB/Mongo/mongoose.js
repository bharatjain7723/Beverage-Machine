const mongoose = require('mongoose');

const config = require('../../configuration.json');

const mongoConfig = {
    userName: config['db']['mongo']['userName'],
    password: config['db']['mongo']['password'],
    dbName: config['db']['mongo']['dbName']
}

const mongoConnectionUrl = `mongodb+srv://${mongoConfig.userName}:${mongoConfig.password}@cluster0.2ywer.mongodb.net/${mongoConfig.dbName}?retryWrites=true&w=majority`;

module.exports.createMongoConnection = () => {
    return new Promise((resolve, reject)=>{
        mongoose.connect(mongoConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client)=>{
            if(err){
                reject(err);
            }
            resolve(client);
        })
    })
}

module.exports.closeMongoConnection = () => {
    return new Promise((resolve, reject)=>{
        mongoose.connection.close((err)=>{
            if(err){
                reject(err);
            }
            resolve('Closing Mongo Connection!');
        })
    })
}