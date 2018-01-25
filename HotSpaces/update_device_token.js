let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	console.log(event);
	ddb.put({
		TableName: 'hs_device_tokens',
		Item: {
			'username': event.username,
			'device_token': event.token
		}
	, function (err, data) {
		if (err) {
			callback(err, null);
		} else {
			let response = {
				"statusCode": 200,
				"headers": {
					"my_header": "my_value"
				},
				"body": JSON.stringify(data),
				"isBase64Encoded": false
			};
			callback(null, response);
		}
	});

}