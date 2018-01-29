let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	var timestamp = new Date();

	ddb.update({
		TableName: 'hs_sort_table',
		ExpressionAttributeNames: { '#gender': 'gender', '#username': 'username' },
		ExpressionAttributeValues: { 
		':timestamp': timestamp.toLocaleString(),
		 ':latitude': JSON.parse(event.body).last_known_lat, 
		 ':longitude': JSON.parse(event.body).last_known_long, 
		 ':gender': JSON.parse(event.body).gender, 
		 ':username': JSON.parse(event.body).username
		  },
		UpdateExpression: 'set last_known_lat=:latitude, last_updated_timestamp=:timestamp, last_known_long=:longitude',
		ConditionExpression: '#gender = :gender and #username = :username',
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