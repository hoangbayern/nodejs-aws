const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserLeaveTable';

async function getLeave(leaveId) {
  try {
    const leave = await getUserLeaveById(leaveId);
    if (leave) {
       const leaveInfo = {
            leave_id: leave.leave_id,
            user_id: leave.user_id,
            start_date: leave.start_date,
            end_date: leave.end_date,
            leave_reason: leave.leave_reason,
            author: leave.author,
            status: leave.status
       };
      return util.buildResponse(200, leaveInfo);
    } else {
      return util.buildResponse(404, { message: 'Get Leave not found' });
    }
  } catch (error) {
    console.error('There is an error getting user: ', error);
    return util.buildResponse(500, { message: 'Internal Server Error' });
  }
}

async function getUserLeaveById(leaveId) {
  const params = {
    TableName: userTable,
    Key: {
      leave_id: leaveId,
    },
  };

  return await dynamodb.get(params).promise().then(response => {
    return response.Item;
  }, error => {
    console.error('There is an error getting user: ', error);
  });
}

module.exports.getLeave = getLeave;
