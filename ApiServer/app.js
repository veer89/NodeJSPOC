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
	app.set('port', process.env.PORT || 8000);
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

//defining global varibles
global._MONGODB = mongoose.createConnection(mongoUrl);
global._SCHEMA = mongoose.Schema;

//require export routes
var routes = require('./routes/exports');

//declaring route's for request
app.post('/users/create', routes.users.add);
app.get('/users/show/:id', routes.users.show);
app.get('/users/query', routes.users.query);
app.put('/users/update/:id', routes.users.update);
app.delete('/users/delete/:id', routes.users.delete);

app.post('/socials/create', routes.socials.add);
app.get('/socials/show/:id', routes.socials.show);
app.get('/socials/query', routes.socials.query);
app.put('/socials/update/:id', routes.socials.update);
app.delete('/socials/delete/:id', routes.socials.delete);

app.post('/projects/create/:id', projects.add);
app.get('/projects/query', projects.query);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

