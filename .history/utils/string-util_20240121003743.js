const dayjs = require('dayjs');

const generateId = () => {
  const id = dayjs().format('YYYYMMDDHHmmssSSS');
  const randomString = generateToken(6);
  return id + randomString;
};

const generateToken = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  while (result.length < length) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  return result;
};

module.exports = { generateId, generateToken };
