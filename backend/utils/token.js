const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, roles: user.roles, serviceNo: user.serviceNo }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = { generateToken };
