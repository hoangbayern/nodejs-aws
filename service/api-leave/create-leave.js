const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
})
const util = require('../../utils/util');
const generateId = require('../../utils/string-util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserLeaveTable';

async function createLeave(leaveInfo) {
  const user_id = leaveInfo.user_id;
  const start_date = leaveInfo.start_date;
  const end_date = leaveInfo.end_date;
  const leave_reason = leaveInfo.leave_reason;
  const author = 'admin';
  const status = 'pending';
  if (!user_id || !start_date || !end_date || !leave_reason) {
    return util.buildResponse(401, {
      message: 'All fields are required'
    })
  }

  const leave = {
    leave_id: generateId.generateId(),
    user_id: user_id,
    start_date: start_date,
    end_date: end_date,
    leave_reason: leave_reason,
    author: author,
    status: status
  }

  const saveLeaveResponse = await saveLeaveUser(leave);
  if (!saveLeaveResponse) {
    return util.buildResponse(503, { message: 'Server Error. Please try again later.'});
  }

  const userLeaveIn4 = {
    user_id: user_id,
    start_date: start_date,
    end_date: end_date
  }
  const response = {
    message: 'Created Leave Successfully!',
    user_leave: userLeaveIn4,
  }

  return util.buildResponse(201, response);
}

async function saveLeaveUser(item) {
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

module.exports.createLeave = createLeave;
