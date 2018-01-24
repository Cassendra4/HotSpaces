let AWS = require('aws-sdk');
const s3 = new AWS.S3();
exports.handler = function (event, context, callback) {
	s3.getObject({
		'Bucket': "find-my-mate-hasangi",
		'Key': event.queryStringParameters.key
	}).promise()
		.then(data => {
			console.log(data);           // successful response
			 let response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
           callback(null, response);
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
			 callback(err, null);
		});

}