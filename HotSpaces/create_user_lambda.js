let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	ddb.put({
		TableName: 'hs_user',
		Item: {
			'username': event.username,
			'email': event.email,
			'first_name': event.first_name,
			'last_name': event.last_name,
			'age': event.age,
			'gender': event.gender,
			'interested_in': event.interested_in,
			'password': event.password,
			'user_avatar': event.user_avatar,
			'contact_number': event.contact_number
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
	ddb.put({
		TableName: 'hs_sort_table',
		Item: {
			'gender': event.gender,
			'last_updated_timestamp': event.last_updated_timestamp,
			'last_known_lat': event.last_known_lat,
			'last_known_long': event.last_known_long,
			'username': event.username
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