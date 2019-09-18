const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/',restricted, (req, res) => {
  console.log('getting list')
  Users.find()
    .then(users => {
      res.json({ users, loggedInUser: req.user.username });
    })
    .catch(err => {
      res.status(500).json({message: `server 500 error ${err}`});

});
})
module.exports = router
