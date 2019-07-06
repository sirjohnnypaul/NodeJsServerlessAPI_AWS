const AWS = require('aws-sdk');

let options = {} //gotta be empty for serverless deployed

if(process.env.IS_OFFLINE) {
    (options.region = 'localhost'), (options.endpoint = 'http://localhost:8000');
}

const dynamoDB = new AWS.DynamoDB.DocumentClient(options);

module.exports = dynamoDB;