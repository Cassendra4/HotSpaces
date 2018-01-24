let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	ddb.put({
		TableName: 'hs_user',
		Item: { 'username': '', 'email': '', 'first_name': '', 'last_name': '', 'age': 'NaN', 'gender': 'NaN', 'interested_in': 'NaN', 'password': '', 'user_avatar': '', 'ARNs': '', 'contact_number': 'NaN' }
	}, function (err, data) {
		if (err) {
			//handle error
		} else {
			//your logic goes here
		}
	});
	ddb.put({
		TableName: 'hs_sort_table',
		Item: { 'hask_key': '', 'last_known_lat': '', 'last_known_long': '', 'last_updated_timestamp': '', 'gender': 'NaN', 'username': '' }
	}, function (err, data) {
		if (err) {
			//handle error
		} else {
			//your logic goes here
		}
	});


	callback(null, 'Successfully executed');
}