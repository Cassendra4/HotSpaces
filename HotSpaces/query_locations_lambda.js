let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
  var currentTimestamp = new Date();
    var yesterdayTimestamp = new Date();
    yesterdayTimestamp.setTime(currentTimestamp.getTime() - 86400000);

    let dbParams;
    
    if (parseInt(event.queryStringParameters.gender) != 2) {
        
        
        
          } else {


    }


}