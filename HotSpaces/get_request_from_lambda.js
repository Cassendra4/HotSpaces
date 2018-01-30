let AWS = require('aws-sdk');
const sns = new AWS.SNS();
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {

	let eventText = event.queryStringParameters.match_username;
	let my_username = event.queryStringParameters.my_username;
	let accepted = event.queryStringParameters.accepted;
	var endPointData = null;
	var token = null;


	let jsonObj = {
		"username": my_username,
		"accepted": accepted,
		"subject": "Accept Request"
	}
	ddb.query({
		TableName: 'hs_device_tokens',
		ExpressionAttributeValues: {
			':username': event.queryStringParameters.match_username
		},
		KeyConditionExpression: 'username = :username',
		FilterExpression: 'undefined'
	}, function (err, data) {
		if (err) {
			callback(err, null);
		} else {

			data.Items.forEach(function (item) {

				console.log(item.device_token);
				sns.createPlatformEndpoint({
					PlatformApplicationArn: 'arn:aws:sns:us-east-1:480964559519:app/GCM/hotspaces',
					Token: item.device_token
				}).promise()
					.then(data => {
						callback(err, null);
					})
					.catch(err => {
						console.log(data.EndpointArn);
						endPointData = data.EndpointArn;
						sns.publish({
							Message: JSON.stringify(jsonObj),
							Subject: 'Accept Request',
							TargetArn: endPointData
						}).promise()
							.then(data => {
								callback(err, null);
							})
							.catch(err => {
								let response = {
									"statusCode": 200,
									"headers": {
										"my_header": "my_value"
									},
									"body": JSON.stringify(data),
									"isBase64Encoded": false
								};
								callback(null, response);
							});
					});

			});

		}
	});

}