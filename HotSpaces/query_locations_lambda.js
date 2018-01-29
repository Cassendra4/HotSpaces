let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	
	ddb.query({
		TableName: 'hs_sort_table',
		ExpressionAttributeValues: {
			':gender': 'NaN',
			':timestamp': '',
			':lat': '',
			':long': ''
		},
		KeyConditionExpression: 'gender = :gender and last_updated_timestamp >= :timestamp',
		FilterExpression: 'last_known_lat >= :lat and last_known_long >= :long'
	}, function (err, data) {
		if (err) {
			//handle error
		} else {
			//your logic goes here
		}
	});


}