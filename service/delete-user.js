const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserTable';

async function deleteUser(userId) {
  try {
    const params = {
      TableName: userTable,
      Key: {
        user_id: userId,
      },
    };

    const response = await dynamodb.delete(params).promise();

    return util.buildResponse(200, { message: 'User deleted successfully' });
  } catch (error) {
    console.error('There is an error deleting user: ', error);
    return util.buildResponse(500, { message: 'Internal Server Error' });
  }
}

module.exports.deleteUser = deleteUser;
