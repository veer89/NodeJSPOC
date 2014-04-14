var routes = require('./routes/exports');

module.exports = function(app){
	app.get('/', routes.index.getIndex);	
	app.post('/signup', routes.index.signup);
	app.get('/profile', routes.index.getProfilePage);
	app.post('/login', routes.index.signin);
	
	app.get('/settings', routes.user.editProfile);
	app.get('/listAddress', routes.user.listAddress);
	app.get('/addNewAddress', routes.user.addAddress);
	app.post('/editAddress', routes.user.editAddress);
	app.post('/changeAddress', routes.user.changeAddress);
	app.post('/uploadImage', routes.user.uploadImage);
};