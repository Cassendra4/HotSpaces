let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
    var currentTimestamp = new Date();
    var yesterdayTimestamp = new Date();
    yesterdayTimestamp.setTime(currentTimestamp.getTime() - 86400000);
    var gender = parseInt(event.queryStringParameters.gender);
    var timestamp = yesterdayTimestamp.toLocaleString();
    let dbParams = 1;

    if (parseInt(event.queryStringParameters.gender) != 2) {
        ddb.query({
            TableName: 'hs_sort_table',
            ExpressionAttributeValues: {
                ':gender': gender,
                ':yesterdayTimestamp': timestamp
            },
            KeyConditionExpression: 'gender = :gender',
            FilterExpression: 'last_updated_timestamp > :yesterdayTimestamp'
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

    } else {

        dbParams = {
            TableName: 'hs_sort_table',
            ExpressionAttributeValues: {
                ':yesterdayTimestamp': yesterdayTimestamp.toLocaleString()
            },
            FilterExpression: 'last_updated_timestamp > :yesterdayTimestamp'
        };

        docClient.scan(dbParams, function (err, data) {
            console.log("err", err);
            console.log("data", data);
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


}