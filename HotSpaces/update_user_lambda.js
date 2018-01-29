let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
    ddb.update({
        TableName: 'hs_user',
        ExpressionAttributeNames: { '#username': 'username' },
        ExpressionAttributeValues: { 
        ':contact_number': JSON.parse(event.body).contact_number, 
        ':age': JSON.parse(event.body).age, 
        ':first_name': JSON.parse(event.body).first_name, 
        ':last_name': JSON.parse(event.body).last_name, 
        ':gender': JSON.parse(event.body).gender, 
        ':interested_in': JSON.parse(event.body).interested_in, 
        ':user_avatar': JSON.parse(event.body).user_avatar, 
        ':username':  event.queryStringParameters.username,
        ':email': JSON.parse(event.body).email
        },
        UpdateExpression: 'set contact_number=:contact_number , age=:age ,  first_name=:first_name ,  last_name=:last_name ,  gender=:gender ,  interested_in=:interested_in ,  user_avatar=:user_avatar, email=:email',
        ConditionExpression: '#username = :username',
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
       }  //your logic goes here
        }
    });


}