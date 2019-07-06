const dynamoDB = require('../dynamodb');
const uuid = require('uuid');
const Joi = require('joi');

module.exports.updatebyid = async (evt, ctx) => {

    const id = evt.pathParameters.id;

	const data = JSON.parse(evt.body);
	const timestamp = new Date().getTime();
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        published: Joi.boolean().required()
    });

    try {
        const {error,value} = Joi.validate(data,schema);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error.details)
        }
    }
	const params = {
		TableName: process.env.JOBS_TABLE,
        Key: {
            id
        },
        UpdateExpression: 
            'SET title= :title, published= :published, updatedAt= :updatedAt',
        ExpressionAttributeValues: {
            ':title': data.title,
            ':published': data.published,
            ':updatedAt': timestamp
    },
    ReturnValues: 'ALL_NEW'
	};
	try {
		const results = await dynamoDB.update(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify(results.Attributes)
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		};
	}
};
