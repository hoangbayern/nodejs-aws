//manage service authenticate
const registerService = require('./service/register');
const loginService = require('./service/login');
//manage service user
const createUserService = require('./service/create-user');
const listUsersService = require('./service/list-users');
const getUserService = require('./service/get-user');
const deleteUserService = require('./service/delete-user');
const updateUserService = require('./service/edit-user');
//manage service leave user
const createLeaveService = require('./service/api-leave/create-leave');
const allLeaveService = require('./service/api-leave/all-leave');
const getLeaveService = require('./service/api-leave/get-leave');
const deleteLeaveService = require('./service/api-leave/delete-leave');
const updateLeaveService = require('./service/api-leave/update-leave');
const searchLeaveService = require('./service/api-leave/search-leave');

const util = require('./utils/util');

const healthPath = '/health';
const registerPath = '/register';
const loginPath = '/login';
const createUserPath = '/create_user';
const listUsersPath = '/list_users';
const getUserPath = '/get_user';
const deleteUserPath = '/delete_user';
const updateUserPath = '/update_user';

const createLeavePath = '/leave/create_leave';
const allLeavePath = '/leave/all_leave';
const getLeavePath = '/leave/get_leave';
const deleteLeavePath = '/leave/delete_leave';
const updateLeavePath = '/leave/update_leave';
const searchLeavePath = '/leave/search_leave';

exports.handler = async (event) => {
    console.log('Request Event: ', event);
    let response;
    switch(true) {
        case event.httpMethod === 'GET' && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === 'GET' && event.path === listUsersPath:
            response = await listUsersService.listUsers();
            break;
        case event.httpMethod === 'GET' && event.path === allLeavePath:
            response = await allLeaveService.allLeave();
            break;    
        case event.httpMethod === 'GET' && event.path === getUserPath:
            const userId = event.queryStringParameters?.user_id;
            response = await getUserService.getUser(userId);
            break;
        case event.httpMethod === 'GET' && event.path === getLeavePath:
            const leaveId = event.queryStringParameters?.leave_id;
            response = await getLeaveService.getLeave(leaveId);
            break;
        case event.httpMethod === 'GET' && event.path === searchLeavePath:
            response = await searchLeaveService.searchLeave(event);
            break;
        case event.httpMethod === 'POST' && event.path === registerPath:
            const registerBody = JSON.parse(event.body);
            response = await registerService.register(registerBody);
            break;
        case event.httpMethod === 'POST' && event.path === loginPath:
            const loginBody = JSON.parse(event.body);
            response = await loginService.login(loginBody);
            break;
        case event.httpMethod === 'POST' && event.path === createUserPath:
            const createUserBody = JSON.parse(event.body);
            response = await createUserService.createUser(createUserBody);
            break;
        case event.httpMethod === 'POST' && event.path === createLeavePath:
            const createLeaveBody = JSON.parse(event.body);
            response = await createLeaveService.createLeave(createLeaveBody);
            break;
        case event.httpMethod === 'PUT' && event.path === updateUserPath:
            const updateUserBody = JSON.parse(event.body);
            const userIdToUpdate = event.queryStringParameters?.user_id;
            response = await updateUserService.updateUser(userIdToUpdate, updateUserBody);
            break;
        case event.httpMethod === 'PUT' && event.path === updateLeavePath:
            const updateLeaveBody = JSON.parse(event.body);
            const leaveIdToUpdate = event.queryStringParameters?.leave_id;
            response = await updateLeaveService.updateLeave(leaveIdToUpdate, updateLeaveBody);
            break;
        case event.httpMethod === 'DELETE' && event.path === deleteUserPath:
            response = await deleteUserService.deleteUser(event.queryStringParameters?.user_id);
            break;
        case event.httpMethod === 'DELETE' && event.path === deleteLeavePath:
            response = await deleteLeaveService.deleteLeave(event.queryStringParameters?.leave_id);
            break;
        default:
            response = util.buildResponse(404, '404 Not Found');
    }
    return response;
};
