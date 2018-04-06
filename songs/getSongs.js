'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.getSongs = (event, context, callback) => {
  const params = {
  TableName: 'myfinal41',
  Key: {
      fileName: event.pathParameters.name
    }
  };
dynamoDb.get(params, (error, result) => {
     if(error){
     console.log(error);
     console.log("error");
     callback(new Error('error!!!'));
     return;
     }
     let info = result.Item;
     if(info == undefined){
     const response = {
     statusCode: 200,
     body: JSON.stringify({
      message: 'no song available',
    })
     };
     callback(null,response);
     return;
}
    const updation = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, updation);
  });
};