const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1'
});
const util = require('../../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserLeaveTable';

async function searchLeave(startTime, endTime, status) {
  const params = {
    TableName: userTable,
    FilterExpression: '#status = :status and #end_date between :start and :end',
    ExpressionAttributeNames: {
      '#status': 'status',
      '#end_date': 'end_date',
    },
    ExpressionAttributeValues: {
      ':status': status,
      ':start': startTime,
      ':end': endTime,
    },
  };

  try {
    const result = await dynamodb.scan(params).promise();
    return util.buildResponse(200, result.Items);
  } catch (error) {
    console.error('Error searching for leave:', error);
    return util.buildResponse(500, { message: 'Server Error. Please try again later.' });
  }
}

module.exports.searchLeave = searchLeave;
