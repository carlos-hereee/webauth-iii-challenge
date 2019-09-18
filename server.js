// require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const usersRouter = require('./routes/users-router.js');
const authRouter = require('./auth/auth-router.js');
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

//routes
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res ) => {
    res.send(`testing web auth iii project`)
})

module.exports = server;