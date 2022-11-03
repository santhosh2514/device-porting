const jwt = require('jsonwebtoken');

const secret = process.env.AUTH_SECRET

const generateAccessToken = (username) => {
  return jwt.sign(username, secret);
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, user) => {

    if (err) return res.sendStatus(403);

    req.user = user

    next()
  })
}

module.exports = {
    generateAccessToken,
    authenticateToken
 }