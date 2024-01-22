const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserTable';

async function updateUser(userId, updatedAttributes) {
    console.log(updatedAttributes);
  const params = {
    TableName: userTable,
    Key: {
      user_id: userId,
    },
    UpdateExpression: 'SET #name = :name, #username = :username, #email = :email, #phone = :phone, #address = :address',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#username': 'username',
      '#email': 'email',
      '#phone': 'phone',
      '#address': 'address',
    },
    ExpressionAttributeValues: {
      ':name': updatedAttributes.name,
      ':username': updatedAttributes.username,
      ':email': updatedAttributes.email,
      ':phone': updatedAttributes.phone,
      ':address': updatedAttributes.address,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const response = await dynamodb.update(params).promise();
    return util.buildResponse(201, response.Attributes);
  } catch (error) {
    console.error('There is an error updating user: ', error);
    throw error;
  }
}

module.exports.updateUser = updateUser;
