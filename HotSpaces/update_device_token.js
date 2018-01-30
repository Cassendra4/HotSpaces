let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	console.log(event);
	console.log(event.body);
	console.log(JSON.parse(event.body).username);
	var username = JSON.parse(event.body).username
	var token = JSON.parse(event.body).token
	ddb.put({
		TableName: 'hs_device_tokens',
		Item: {
			'username': username,
			'device_token': token
		}
	}, function (err, data) {
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