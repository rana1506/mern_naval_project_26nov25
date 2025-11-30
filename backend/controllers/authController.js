const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken } = require('../utils/token');

const register = asyncHandler(async (req, res) => {
  const { serviceNo, password, name, email, roles } = req.body;
  const userExists = await User.findOne({ serviceNo });
  if (userExists) { res.status(400); throw new Error('User exists'); }
  const user = await User.create({ serviceNo, password, name, email, roles });
  res.status(201).json({ _id: user._id, serviceNo: user.serviceNo, name: user.name, roles: user.roles, token: generateToken(user) });
});

const login = asyncHandler(async (req, res) => {
  const { serviceNo, password } = req.body;
  const user = await User.findOne({ serviceNo });
  if (user && (await user.matchPassword(password))) {
    res.json({ _id: user._id, serviceNo: user.serviceNo, name: user.name, roles: user.roles, token: generateToken(user) });
  } else {
    res.status(401); throw new Error('Invalid credentials');
  }
});

module.exports = { register, login };
