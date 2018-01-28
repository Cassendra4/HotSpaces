let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	console.log(event);
	console.log(event.queryStringParameters);
	console.log(event.queryStringParameters.username);
	ddb.get({
		TableName: 'hs_user',
		Key: { 'username': event.queryStringParameters.username }
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