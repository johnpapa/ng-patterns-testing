#!/usr/bin/env node
/*jshint node:true*/
'use strict';

require('look').start(); // perf output to http://localhost:5959
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var errorHandler = require('./utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7206;
var staticFiles = express.static;
var routes;

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(compress());        // Compress response data with gzip
app.use(require('cors')()); // enable ALL CORS requests
app.use(errorHandler.init);

app.use('/api', require('./routes'));

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

var source = '';

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment){
    case 'build':
        console.log('** BUILD **');
        app.use('/', staticFiles('./build/'));
        break;
    default:
        console.log('** DEV **');
        app.use(staticFiles('./src/client/'));
        app.use(staticFiles('./'));
        app.use(staticFiles('./.tmp/'));
        app.use('/*', staticFiles('./src/client/index.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());
});
