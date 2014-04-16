var routes = require('./routes/exports');

module.exports = function(app){
	//index
	app.get('/', routes.index.getIndex);	
	app.post('/signup', routes.index.signup);
	app.get('/profile', routes.index.getProfilePage);
	app.post('/login', routes.index.signin);
	//user
	app.get('/settings', routes.user.editProfile);
	app.post('/uploadImage', routes.user.uploadImage);
	
	//address
	app.get('/listAddress', routes.address.listAddress);
	app.get('/addNewAddress', routes.address.addAddress);
	app.post('/editAddress', routes.address.editAddress);
	app.post('/changeAddress', routes.address.changeAddress);
};