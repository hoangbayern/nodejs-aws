const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserTable';

async function deleteUser(userId) {
  
}



module.exports.deleteUser = deleteUser;
