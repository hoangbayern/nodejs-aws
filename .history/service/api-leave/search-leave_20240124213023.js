const AWS = require('aws-sdk');
AWS.config.update({
    region: 'us-east-1'
});
const util = require('../../utils/util');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'hoang-UserLeaveTable';

async function searchLeave(event) {
    const status = event.queryStringParameters?.status;
    const startTime = event.queryStringParameters?.start_time;
    const endTime = event.queryStringParameters?.end_time;

    let params = {
        TableName: userTable,
        FilterExpression: 'attribute_exists(#status) AND attribute_exists(#start_date)',
        ExpressionAttributeNames: {
            '#status': 'status',
            '#start_date': 'start_date',
        },
        ExpressionAttributeValues: {},
    };

    // Thêm ExpressionAttributeValues

    if (status) {
        params.FilterExpression += ' AND #status = :status';
        params.ExpressionAttributeValues[':status'] = status;
    }

    if (startTime && endTime) {
        params.FilterExpression += ' AND #start_date BETWEEN :start AND :end';
        params.ExpressionAttributeValues[':start'] = startTime;
        params.ExpressionAttributeValues[':end'] = endTime;
    }

    try {
        const result = await dynamodb.scan(params).promise();
        return util.buildResponse(200, result.Items);
    } catch (error) {
        console.error('Error searching for leave:', error);
        return util.buildResponse(500, { message: 'Server Error. Please try again later.' });
    }
}

module.exports.searchLeave = searchLeave;