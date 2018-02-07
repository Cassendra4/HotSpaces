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
		Item: { 'username': '', 'gender': 'NaN', 'password': '', 'first_name': '', 'last_name': '' }
	}, function (err, data) {
		if (err) {
			//handle error
		} else {
			ddb.put({
				TableName: 'hs_sort',
				Item: { 'username': '', 'gender': '' }
			}, function (err, data) {
				if (err) {
					//handle error
				} else {
					//your logic goes here
				}
			});

		}
	});



}