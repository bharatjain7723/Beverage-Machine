const aws = require('aws-sdk');
const fs = require('fs');
const config = require('../../../configuration.json');
const footer = fs.readFileSync(__dirname+'/../../../Utilities/Email/Templates/footer.html', 'utf-8');

const sesConfig = {
    accessKeyId: config['aws']['credentials']['accessKeyId'],
    secretAccessKey: config['aws']['credentials']['secretAccessKey'],
    region: 'us-west-2',
    apiVersion: '2010-12-01'
}

function sendMail(subject, text, recepientMail, variables, additionalObject) {
    let someObject = null;
    let replyTo = config['aws']['ses']['replyTo'];
    let sender = config['aws']['ses']['from'] + '<' + config['aws']['ses']['sender'] + '>';
    for(let aVariable in variables) {
        someObject = variables[aVariable];
        break;
    }

    if(someObject) {
        for(let key in someObject) {
            let str = '%recipient.'+key+'%';
            let re = new RegExp(str, 'g');
            text = text.replace(re, someObject[key]);
        }
    }

    text += footer.replace(/%recipient.domain%/g, config['domain']);

    var params = {
        Destination: {
            ToAddresses: recepientMail
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: text
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: sender,
        ReplyToAddress: [
            replyTo
        ]
    }

    var sendPromise = new aws.SES(sesConfig).sendEmail(params).promise();
    return sendPromise;
}

module.exports = sendMail;