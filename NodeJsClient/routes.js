var routes = require('./routes/exports');

module.exports = function(app){
	app.get('/', routes.index.getIndex);	
	app.post('/signup', routes.index.signup);
};