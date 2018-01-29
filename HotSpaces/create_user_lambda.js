let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	ddb.put({
		TableName: 'hs_user',
		Item: {
			'username': JSON.parse(event.body).username,
			'email': JSON.parse(event.body).email,
			'first_name': JSON.parse(event.body).first_name,
			'last_name': JSON.parse(event.body).last_name,
			'age': JSON.parse(event.body).age,
			'gender': JSON.parse(event.body).gender,
			'interested_in': JSON.parse(event.body).interested_in,
			'password': JSON.parse(event.body).password,
			'user_avatar': JSON.parse(event.body).user_avatar,
			'contact_number': JSON.parse(event.body).contact_number
		}
	}, function (err, data) {
		if (err) {
			callback(err, null);
		} else {

			ddb.put({
				TableName: 'hs_sort_table',
				Item: { 
				'gender': JSON.parse(event.body).gender, 
				'username': JSON.parse(event.body).username, 
				'last_known_lat': JSON.parse(event.body).last_known_lat, 
				'last_updated_timestamp': new Date(), 
				'last_known_long': JSON.parse(event.body).last_known_long
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
	});

}