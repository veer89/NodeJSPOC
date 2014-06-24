var routes = require('./routes/exports');

module.exports = function(app){
	//index
	app.get('/', routes.index.getIndex);	
	app.post('/signup', routes.index.signup);
	app.get('/profile', routes.index.getProfilePage);
	app.post('/login', routes.index.signin);
	app.get('/logout', routes.index.logout);
	app.post('/forgotPassword', routes.index.forgotPassword);
	app.post('/changePassword', routes.index.changePassword);
	//user
	app.get('/settings', routes.user.editProfile);
	app.post('/uploadImage', routes.user.uploadImage);
	
	//address
	app.get('/listAddress', routes.address.listAddress);
	app.get('/addNewAddress', routes.address.addAddress);
	app.post('/editAddress', routes.address.editAddress);
	app.post('/changeAddress', routes.address.changeAddress);
	
	//project
	app.get('/listProject',routes.project.listProject);
	app.get('/addNewProject', routes.project.addProject);
	app.post('/changeProject', routes.project.changeProject);
	app.post('/editProject', routes.project.editProject);
	
	app.get('/showUserProjects', routes.project.showUserProjects);
	app.post('/addUserToProject', routes.project.addUserToProject);
	app.post('/addUserToNewProject', routes.project.addUserToNewProject);
	app.post('/removeUserFromProject', routes.project.removeUserFromProject);
	
	
};