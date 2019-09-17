const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const KnexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('./data/db-config');
const server = express();

const sessionConfig = {
    name: 'sessionCookie',
    secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000*60*60, // in milliseconds
        secure: false,
        httpOnly: true,
        store: new KnexSessionStore({
            knex: dbConnection,
            tablename: 'knexsession',
            sidfieldname: 'sessionid',
            createtable: true,
            clearInterval: 1000*60*30
        }),
        resave: false,
        saveUninitialzed: true
    }
}
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.get('/', (req, res ) => {
    res.send(`testing web auth iii project`)
})

module.exports = server;