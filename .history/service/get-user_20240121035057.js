const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserTable';

async function getUser(event) {
  try {
    const userId = event.pathParameters.user_id;

    const user = await getUserById(userId);
    if (user) {
      const userInfo = {
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address
      };
      return util.buildResponse(200, userInfo);
    } else {
      return util.buildResponse(404, { message: 'User not found' });
    }
  } catch (error) {
    console.error('There is an error getting user: ', error);
    return util.buildResponse(500, { message: 'Internal Server Error' });
  }
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
