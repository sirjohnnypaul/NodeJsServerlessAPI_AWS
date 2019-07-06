const dynamoDB = require('../dynamodb');

module.exports.deletebyid=async(evt,ctx) =>{
    const id = evt.pathParameters.id;

    try {
        await dynamoDB.delete({
            TableName: process.env.JOBS_TABLE,
            Key: {
                id
            }
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({msg: `Record ${id} deleted succesfully`})
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }
}
