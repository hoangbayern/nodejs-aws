const registerService = require('./service/register');
const loginService = require('./service/login');
const createUserService = require('./service/create-user');
const listUsersService = require('./service/list-users');
const getUserService = require('./service/get-user');
const deleteUserService = require('./service/delete-user');
const updateUserService = require('./service/edit-user');
const util = require('./utils/util');

const healthPath = '/health';
const registerPath = '/register';
const loginPath = '/login';
const createUserPath = '/create_user';
const listUsersPath = '/list_users';
const getUserPath = '/get_user';
const deleteUserPath = '/delete_user';
const updateUserPath = '/update_user';

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
        case event.httpMethod === 'GET' && event.path === getUserPath:
            const userId = event.queryStringParameters?.user_id;
            response = await getUserService.getUser(userId);
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
        case event.httpMethod === 'DELETE' && event.path === deleteUserPath:
            response = await deleteUserService.deleteUser(event.queryStringParameters?.user_id);
            break;
        default:
            response = util.buildResponse(404, '404 Not Found');
    }
    return response;
};
