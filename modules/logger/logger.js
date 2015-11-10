const config = require('./../../config/config.js');
const bunyan = require('bunyan');
const path = require('path');
const log = bunyan.createLogger({
    name: config.app.name,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'warm',
            stream: process.stdout
        },
        {
            level: 'error',
            path: path.join(__dirname, './../../logs/') + config.app.name + '-error.log'
        }
    ]
});

module.exports = log;