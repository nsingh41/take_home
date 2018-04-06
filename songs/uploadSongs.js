'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3()
module.exports.uploadSongs = (event) => {
event.Records.forEach((record) => {
const filename = record.s3.object.key;
const filesize = record.s3.object.size;
const eventTime = record.eventTime;
const eventDate = record.eventDate;
    const params = {
      TableName: 'myfinal41',
      Item: {
        id: uuid.v1(),
        Name: filename,
        size: filesize,
        eventDate: eventDate,
        eventTime: eventTime
      }
    }
dynamoDb.put(params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      })
    })
};