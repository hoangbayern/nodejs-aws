const jwt = require('jsonwebtoken');

function generateToken(userInfo) {
  if (!userInfo) {
    return null;
  }

  return jwt.sign(userInfo, process.env.JWT_SECRET, {
    expiresIn: '10s'
  })
}

module.exports.generateToken = generateToken;
