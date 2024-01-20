const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');
const generateId = require('../utils/string-util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserTable';

async function createUser(userInfo) {
  const name = userInfo.name;
  const email = userInfo.email;
  const username = userInfo.username;
  const password = userInfo.password;
  const phone = userInfo.phone;
  const address = userInfo.address;
  if (!username || !name || !email || !password) {
    return util.buildResponse(401, {
      message: 'All fields are required'
    })
  }

  const dynamoUser = await getUser(username.toLowerCase().trim());
  if (dynamoUser && dynamoUser.username) {
    return util.buildResponse(401, {
      message: 'username already exists in our database. please choose a different username'
    })
  }

  const encryptedPW = bcrypt.hashSync(password.trim(), 10);
  const user = {
    user_id: generateId.generateId(),
    name: name,
    email: email,
    username: username.toLowerCase().trim(),
    password: encryptedPW,
    phone: phone,
    address: address
  }

  const saveUserResponse = await saveUser(user);
  if (!saveUserResponse) {
    return util.buildResponse(503, { message: 'Server Error. Please try again later.'});
  }

  const userInfo = {
    username: username,
    name: name,
    email: email
  }
  const response = {
    message: 'Register Successfully!',
    user: userInfo,
  }

  return util.buildResponse(200, response);
}

async function getUser(userId) {
  const params = {
    TableName: userTable,
    Key: {
      user_id: userId,
    }
  }

  return await dynamodb.get(params).promise().then(response => {
    return response.Item;
  }, error => {
    console.error('There is an error getting user: ', error);
  })
}

async function saveUser(item) {
  const params = {
    TableName: userTable,
    Item: item
  }
  return await dynamodb.put(params).promise().then(() => {
    return true;
  }, error => {
    console.error('There is an error saving user: ', error)
  });
}

module.exports.createUser = createUser;