let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	console.log(event);
	var currentTimestamp = new Date();
	var username = JSON.parse(event.body).username;
	var email = JSON.parse(event.body).email;
	var firstName = JSON.parse(event.body).first_name;
	var lastName = JSON.parse(event.body).last_name;
	var age = JSON.parse(event.body).age;
	var gender = JSON.parse(event.body).gender;
	var interestedIn = JSON.parse(event.body).interested_in;
	var password = JSON.parse(event.body).password;
	var userAvatar = JSON.parse(event.body).user_avatar;
	var contactNumber = JSON.parse(event.body).contact_number;
	var lat = JSON.parse(event.body).last_known_lat;
	var long = JSON.parse(event.body).last_known_long;
	var currentTime = currentTimestamp.toLocaleString();
	ddb.put({
		TableName: 'hs_user',
		Item: {
			'username': username,
			'email': email,
			'first_name': firstName,
			'last_name': lastName,
			'age': age,
			'gender': gender,
			'interested_in': interestedIn,
			'password': password,
			'user_avatar': userAvatar,
			'contact_number': contactNumber
		}
	}, function (err, data) {
		console.log('err',err);
		console.log('data',data);
		if (err) {
			callback(err, null);
		} else {

			ddb.put({
				TableName: 'hs_sort_table',
				Item: {
					'gender': gender,
					'username': username,
					'last_known_lat': lat,
					'last_updated_timestamp': currentTime,
					'last_known_long': long
				}
			}, function (err, data) {
				console.log('err',err);
		console.log('data',data);
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