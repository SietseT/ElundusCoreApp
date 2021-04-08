const express = require('express');
const cors = require("cors");
const routes = require('./routes');

var server = express();
server.disable('x-powered-by');

server.use(cors());

/**
 * Middlewares
 */
server.use(express.json());

/**
 * Routes
 */
server.use(routes);

module.exports = server;