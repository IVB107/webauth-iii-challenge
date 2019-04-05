const jwt = require('jsonwebtoken');

const secret = require('../api/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  token
    ? jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
    : res.status(400).json({ message: "No Credentials Provided" });
}