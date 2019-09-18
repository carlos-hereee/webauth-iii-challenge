const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err) {
                // token expred or invalid
                res.status(401).json({message: 'you shall not pass'})

            }else{
                // token is good
                console.log('its working, its working!')
                req.user = { username:decodedToken.username};
                next();
            }
        })
    }else{
        res.status(500).json({ message: `500 server error ${error}`})
    }
  };
  

