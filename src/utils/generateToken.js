const jwt = require('jsonwebtoken');
const config = require('../config/index')
const generateToken =  (userId) => {
  
  return jwt.sign(
    { id: userId },
    config.JWT_SECRET,
    { expiresIn: '1h' } 
  );
};


module.exports = generateToken;