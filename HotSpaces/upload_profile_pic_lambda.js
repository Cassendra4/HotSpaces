let AWS = require('aws-sdk');
const s3 = new AWS.S3();
exports.handler = function (event, context, callback) {
 	let encodedImage =JSON.parse(event.body).user_avatar;
     let decodedImage = Buffer.from(encodedImage, 'base64');
	  var filePath = "hotspaces-avatars/" + event.queryStringParameters.username + ".jpg";

	s3.putObject({
		"Body":  decodedImage,
		"Bucket": "find-my-mate-hasangi",
		"Key": filePath 
	})
		.promise()
		.then(data => {
			console.log(data);           // successful response
		let response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(filePath),
        "isBase64Encoded": false
    };
           callback(null, response);
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred
			callback(err, null);
		});

}