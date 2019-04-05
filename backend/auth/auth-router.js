const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret = require('../api/secrets.js');
const Users = require('../users/users-model.js');

const generateToken = user => {

  const payload = {
    subject: user.id,
    username: user.username,
    department: user.departmnent
  }

  const options = {
    expiresIn: '2h'
  }

  return jwt.sign(payload, secret.jwtSecret, options);
}

router.post('/register', (req, res) => {
  let user = req.body;
  user.password = bcrypt.hashSync(user.password, 8);

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);
      res.status(201).json({
        message: `Welcome, ${saved.username}!`,
        token
      })
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

          const token = generateToken(user);

          res.status(200).json({
            message: `Welcome back, ${username}!`,
            token
          });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
});


module.exports = router;