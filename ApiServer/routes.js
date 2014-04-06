var routes = require('./routes/exports'),
    filter = require('./filter.js');

module.exports = function(app){
	
// declaring route's for user
    app.post('/users/create/:activate', filter.keyFilter, routes.users.add);
    app.get('/users/activate', routes.users.activateUser);
    app.get('/users/show/:id', filter.keyFilter, routes.users.show);
    app.get('/users/query', filter.keyFilter, routes.users.query);
    app.put('/users/update/:id', filter.keyFilter, routes.users.update);
    app.delete('/users/delete/:id', filter.keyFilter, routes.users.delete);

// declaring route's for project
    app.post('/projects/create', filter.keyFilter, routes.projects.addProject);
    app.get('/projects/query', filter.keyFilter, routes.projects.query);
    app.post('/projects/addUserToProject', filter.keyFilter, filter.userFilter, routes.projects.addUserToProject);
    app.put('/projects/update/:id', filter.keyFilter, routes.projects.update);
    app.delete('/projects/removeUserFromProject', filter.keyFilter,filter.userFilter, routes.projects.removeUserFromProject);
    app.get('/projects/show/:projectName', filter.keyFilter, routes.projects.show);

// declaring route's for social integration
    app.post('/socials/create', filter.keyFilter, filter.userFilter, routes.socials.add);
    app.get('/socials/show/:id', filter.keyFilter, routes.socials.show);
    app.get('/socials/query', filter.keyFilter, routes.socials.query);
    app.put('/socials/update/:id', filter.keyFilter, filter.userFilter, routes.socials.update);
    app.delete('/socials/delete/:id', filter.keyFilter, filter.userFilter, routes.socials.delete);

// routes declared for image events
    app.post('/picture/create', filter.keyFilter, filter.userFilter, routes.picture.add);
    app.get('/picture/show/:id', filter.keyFilter, routes.picture.show);
    app.put('/picture/update/:id', filter.keyFilter, filter.userFilter, routes.picture.update);
    app.delete('/picture/delete/:id', filter.keyFilter, filter.userFilter, routes.picture.delete);

// declaring routes for login
    app.post('/login/:emailId/:password', filter.keyFilter, routes.logins.authenticate);
    app.post('/changePassword/:id/:password', filter.keyFilter, routes.logins.changePassword);
    app.post('logout', filter.keyFilter, routes.logins.logout);

// declaring routes for address
    app.post('/address/create', filter.keyFilter, filter.userFilter,  routes.address.add);
    app.get('/address/show/:id', filter.keyFilter, routes.address.show);
    app.get('/address/query', filter.keyFilter, routes.address.query);
    app.put('/address/update/:id', filter.keyFilter, filter.userFilter, routes.address.update);
    app.delete('/address/delete/:id', filter.keyFilter, filter.userFilter, routes.address.delete);
};
