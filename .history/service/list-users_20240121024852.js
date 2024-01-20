const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})
const util = require('../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserTable';

async function listUsers() {
    try {
      const params = {
        TableName: userTable,
      };
  
      const response = await dynamodb.scan(params).promise();
  
      return util.buildResponse(200, response.Items);
    } catch (error) {
      console.error('There is an error listing users: ', error);
      return util.buildResponse(500, { message: 'Internal Server Error' });
    }
  }

module.exports.listUsers = listUsers;
