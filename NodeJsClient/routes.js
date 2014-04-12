var routes = require('./routes/exports');

module.exports = function(app){
	app.get('/', routes.index.getIndex);	
	app.post('/signup', routes.index.signup);
	app.get('/profile', routes.index.getProfilePage);
	app.post('/login', routes.index.signin);
	
	app.get('/settings', routes.user.editProfile);
	app.get('/editAddress', routes.user.editAddress);
	app.post('/changeAddress', routes.user.changeAddress);
	app.post('/uploadImage', routes.user.uploadImage);
	app.get('/image.png', routes.user.showImage); 
};