'use strict';

const config = require('./config.json');

module.exports = {
    app: {
        name: config.app.name,
        host: config.app.host,
        port: config.app.port
    }
};