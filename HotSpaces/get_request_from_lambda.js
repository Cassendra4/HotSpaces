let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	let eventText = event.queryStringParameters.match_username;
	let my_username = event.queryStringParameters.my_username;
	let accepted = event.queryStringParameters.accepted;
	let applicationArn = "arn:aws:sns:us-east-1:480964559519:app/GCM/hotspaces";
	var endPointData = null;
	var token = null;


	let jsonObj = {
		"username": my_username,
		"accepted": accepted,
		"subject": "Accept Request"
	}
	ddb.query({
		TableName: 'hs_device_tokens',
		ExpressionAttributeValues: { ':username': event.queryStringParameters.match_username },
		KeyConditionExpression: 'username = :username'
	}, function (err, data) {
		if (err) {
		 callback(err, null);
		} else {
			
			data.Items.forEach(function(item) {
               
           console.log(item.device_token);

			}

		}
	});




}