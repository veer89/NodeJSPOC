var routes = require('./routes/exports');

module.exports = function(app){
	app.get('/', routes.index.getIndex);	
};