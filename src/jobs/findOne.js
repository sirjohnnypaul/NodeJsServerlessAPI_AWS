const dynamoDB = require('../dynamodb');

module.exports.findbyid=async(evt,ctx) =>{
    const id = evt.pathParameters.id;

    try {
        const results = await dynamoDB.get({
            TableName: process.env.JOBS_TABLE,
            Key: {
                id
            }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(results.Item)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}
