const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserTable';

async function updateUser(userId) {
  
}

async function getUserById(userId) {
  const params = {
    TableName: userTable,
    Key: {
      user_id: userId,
    },
  };

  return await dynamodb.get(params).promise().then(response => {
    return response.Item;
  }, error => {
    console.error('There is an error getting user: ', error);
  });
}

module.exports.getUser = getUser;
