/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var helper = require('./public/utils/helper.js');
var mongoose = require('mongoose');
var app = express();
var log4js = require('log4js');
var logger = require('./public/utils/logger.js');
//var mongoUrl = 'mongodb://127.0.0.1/nodeJsPocApiServer';
var mongoUrl = 'mongodb://admin:admin@ds029277.mongolab.com:29277/apiserver';

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 8000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.multipart());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(log4js.connectLogger(logger, { level: log4js.levels.DEBUG }));
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.bodyParser());
	app.use(function(req, res,next){
		res.send(helper.genarateResponse(404, null, null, 'Please specify correct path'));
		logger.error('Please specify correct path');
	});
	app.use(function(error, req, res,next){
		res.send(helper.genarateResponse(401, null, null, 'Error occured in processing. ' + error));
		logger.error('Error occured in processing. ' + error);
	});
});

//defining global variables
global._MONGODB = mongoose.createConnection(mongoUrl);
global._SCHEMA = mongoose.Schema;
global._APPKEY = "ac5028363f1a32eed640de5d23195b499cc3146d";
global._LOGGER = logger;

//exporting routes 
require('./routes.js')(app);

http.createServer(app).listen(app.get('port'), function() {
	logger.debug('Express server listening on port ' + app.get('port'));
});

