var routes = require('./routes/exports');

module.exports = function(app){
	app.get('/', routes.index.getIndex);	
	app.post('/signup', routes.index.signup);
	app.get('/profile', routes.index.getProfilePage);
	app.post('/login', routes.index.signin);
	
	app.get('/settings/:id', routes.user.editProfile);
	app.get('/editAddress/:id', routes.user.editAddress);
	app.post('/changeAddress/:id', routes.user.changeAddress);
	app.post('/uploadImage/:id', routes.user.uploadImage);
	app.get('/image.png/:id', routes.user.showImage); 
};