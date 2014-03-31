/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var mongoUrl = 'mongodb://127.0.0.1/nodeJsPocApiServer';

app.configure(function() {
	// all environments
	app.set('port', process.env.PORT || 9000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}
});

//defining global varibales
global._MONGODB = mongoose.createConnection(mongoUrl);
global._SCHEMA = mongoose.Schema;

var users = require('./routes/users');

//declaring route's for request
app.post('/users/create', users.add);
app.get('/users/show/:id', users.show);
app.get('/users/query', users.query);
app.put('/users/update/:id', users.update);
app.delete('/users/delete/:id', users.delete);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

//closing mongo connection on exit
process.on('SIGINT', function(){
	global._MONGODB.close();
});
