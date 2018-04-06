'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.playlist = (event, context, callback) => {
const data = JSON.parse(event.body);
  const params = {
    TableName: 'myfinalexam41',
    Item: {
      id: uuid.v1(),
      songs: data.songs,
      playlist: data.playlist,
      recentlyplayed: data.recentlyplayed
    }
  }
  dynamoDb.put(params, (error, result) =>{
    if (error){
      console.error(error)
      callback(new Error('couldn\'t create songs playlist'))
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response)
  })
}