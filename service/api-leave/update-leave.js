const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserLeaveTable';

async function updateLeave(leaveId, updatedAttributes) {
  const params = {
    TableName: userTable,
    Key: {
      leave_id: leaveId,
    },
    UpdateExpression: 'SET #user_id = :user_id, #start_date = :start_date, #end_date = :end_date, #leave_reason = :leave_reason, #author = :author, #status = :status',
    ExpressionAttributeNames: {
      '#user_id': 'user_id',
      '#start_date': 'start_date',
      '#end_date': 'end_date',
      '#leave_reason': 'leave_reason',
      '#author': 'author',
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':user_id': updatedAttributes.user_id,
      ':start_date': updatedAttributes.start_date,
      ':end_date': updatedAttributes.end_date,
      ':leave_reason': updatedAttributes.leave_reason,
      ':author': updatedAttributes.author,
      ':status': updatedAttributes.status,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const response = await dynamodb.update(params).promise();
    const result = {
        message: 'The Leave Updated Successfully!',
        data: response.Attributes,
      }
    return util.buildResponse(200, result);
  } catch (error) {
    console.error('There is an error updating user: ', error);
    throw error;
  }
}

module.exports.updateLeave = updateLeave;
