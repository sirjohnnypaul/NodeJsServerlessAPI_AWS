const dynamoDB = require('../dynamodb');
const uuid = require('uuid');
const Joi = require('joi');

module.exports.create = async (evt, ctx) => {
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
		Item: {
			id: uuid.v1(),
			title: data.title,
			published: data.published,
			createdAt: timestamp,
			updatedAt: timestamp
		}
	};
	try {
		await dynamoDB.put(params).promise();
		return {
			statusCode: 200,
			body: JSON.stringify(params.Item)
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify(error)
		};
	}
};
