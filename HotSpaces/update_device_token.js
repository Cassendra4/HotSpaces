let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	ddb.put({
		TableName: 'hs_device_tokens',
		Item: { 
			'username': event.username, 
			'token': event.token
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