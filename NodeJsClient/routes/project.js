var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');
var async = require('async');

var project = {
		listProject : function(req, res, next){
			helper.sendRequest(endPoints.projects.query, null, null, null, function(result) {
		    	var projectData;
				if(result && result.meta){
					if(result.meta.status == '200' && result.data){
						projectData = result.data;
					} 
				} 
				res.render('listProject', { 
					projectData : projectData											
				});
			});
		},
		addProject : function(req, res, next) {
			//var empId = req.session.user_id;
			var projectData = {
					id : 'new',
					projectName : '',
					projectLocation : '',
					projectDuration : ''
			};
			res.render('editProject', {
				projectData : projectData
			});
		},
		changeProject : function(req, res, next){
			var projId = req.body.projId;
			var projectData = {};
			var data = {
					projectName : req.body.projectName,
					projectDuration : req.body.projectDuration,
					projectLocation : req.body.projectLocation
			}
			if(projId == 'new'){
				helper.sendRequest(endPoints.projects.create, data, null, null, function(result) {
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							projectData.projectName = (result.data.projectName == undefined ? '' : result.data.projectName);
							projectData.projectDuration = (result.data.projectDuration == undefined ? '' : result.data.projectDuration);
							projectData.projectLocation = (result.data.projectLocation == undefined ? '' : result.data.projectLocation);
							projectData.id = (result.data._id == undefined ? '' : result.data._id);
						}
					}
					res.render('editProject', { 
						projectData : projectData											
					});
				});
			} else {
				helper.sendRequest(endPoints.projects.update, data, null, [projId], function(result) {
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							projectData.projectName = (result.data.projectName == undefined ? '' : result.data.projectName);
							projectData.projectDuration = (result.data.projectDuration == undefined ? '' : result.data.projectDuration);
							projectData.projectLocation = (result.data.projectLocation == undefined ? '' : result.data.projectLocation);
							projectData.id = (result.data._id == undefined ? '' : result.data._id);
						}
					}
					res.render('editProject', { 
						projectData : projectData											
					});
				});
			}
			
		},
		editProject : function(req, res, next){
			var projId = req.body.projId;
			var projectData = {};
			helper.sendRequest(endPoints.projects.show, null, null, [projId], function(result) {
				if(result && result.meta){
					if(result.meta.status == '200' && result.data){
						projectData.projectName = (result.data.projectName == undefined ? '' : result.data.projectName);
						projectData.projectDuration = (result.data.projectDuration == undefined ? '' : result.data.projectDuration);
						projectData.projectLocation = (result.data.projectLocation == undefined ? '' : result.data.projectLocation);
						projectData.id = (result.data._id == undefined ? '' : result.data._id);
					} 
				} 
				res.render('editProject', { 
					projectData : projectData											
				});
			});
		},
		showUserProjects : function(req, res, next){
			var empId = req.session.user_id;
			var userData = req.session.userObj;
			var userProjectList;
			var projectList;
			
			async.series([function(callback) {
			    	helper.sendRequest(endPoints.projects.queryByUserId, null, null, [empId], function(result) {
						if(result && result.meta){
							if(result.meta.status == '200' && result.data){
								userProjectList = result.data;
							} 
						}
						callback(null, "retrieve projects")
					});
			    	},
			    	function(callback) {
				    	helper.sendRequest(endPoints.projects.query, null, null, null, function(result) {
							if(result && result.meta){
								if(result.meta.status == '200' && result.data){
									projectList = result.data;
								} 
							} 
							res.render('userProjects', { 
								userData : userData,
								projectList : projectList,
								userProjectList : userProjectList
							});
							callback(null, "retrieve projects")
						});
				    	}
			    
			    ], function(err,results){
				console.log(results);
			});
			
		},
		removeUserFromProject : function(req, res, next){
			var empId = req.session.user_id;
			var projId = req.body.del_projId;
			var userData = req.session.userObj;
			var data = {
					projectId : projId
			}
			var userProjectList;
			var projectList;
			async.series([function(callback) {
				helper.sendRequest(endPoints.projects.removeUserFromProject, data, empId, null, function(result) {
			    	var projectData;
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							projectList = result.data;
						} 
					} 
					callback(null, "removeUser");
				});
				
			    },
			    function(callback) {
			    	helper.sendRequest(endPoints.projects.queryByUserId, null, null, [empId], function(result) {
						if(result && result.meta){
							if(result.meta.status == '200' && result.data){
								userProjectList = result.data;
							} 
						}
						callback(null, "retrieve user projects")
					});
			    	},
			    	function(callback) {
				    	helper.sendRequest(endPoints.projects.query, null, null, null, function(result) {
							if(result && result.meta){
								if(result.meta.status == '200' && result.data){
									projectList = result.data;
								} 
							} 
							res.render('userProjects', { 
								userData : userData,
								projectList : projectList,
								userProjectList : userProjectList
							});
							callback(null, "retrieve all projects")
						});
				    	}
			    
			    ], function(err,results){
				console.log(results);
			});
			
		},
		addUserToProject : function(req, res, next){
			var empId = req.session.user_id;
			var projId = req.body.projId;
			var userData = req.session.userObj;
			var data = {
					projectId : projId
			}
			var userProjectList;
			var projectList;
			async.series([function(callback) {
				helper.sendRequest(endPoints.projects.addUserToProject, data, empId, null, function(result) {
			    	var projectData;
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							projectList = result.data;
						} 
					} 
					callback(null, "addUser");
				});
				
			    },
			    function(callback) {
			    	helper.sendRequest(endPoints.projects.queryByUserId, null, null, [empId], function(result) {
						if(result && result.meta){
							if(result.meta.status == '200' && result.data){
								userProjectList = result.data;
							} 
						}
						callback(null, "retrieve user projects")
					});
			    	},
			    	function(callback) {
				    	helper.sendRequest(endPoints.projects.query, null, null, null, function(result) {
							if(result && result.meta){
								if(result.meta.status == '200' && result.data){
									projectList = result.data;
								} 
							} 
							res.render('userProjects', { 
								userData : userData,
								projectList : projectList,
								userProjectList : userProjectList
							});
							callback(null, "retrieve all projects")
						});
				    	}
			    
			    ], function(err,results){
				console.log(results);
			});
			
		},
		addUserToNewProject : function(req, res, next){
			var empId = req.session.user_id;
			var projId = req.body.projId;
			var userData = req.session.userObj;
			var data = {
					projectName : req.body.projectName,
					projectDuration : req.body.projectDuration,
					projectLocation : req.body.projectLocation
			};
			var projectData = {};
			var userProjectList;
			var projectList;
			async.series([function(callback) {
				helper.sendRequest(endPoints.projects.create, data, null, null, function(result) {
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							projectData.projectName = (result.data.projectName == undefined ? '' : result.data.projectName);
							projectData.projectDuration = (result.data.projectDuration == undefined ? '' : result.data.projectDuration);
							projectData.projectLocation = (result.data.projectLocation == undefined ? '' : result.data.projectLocation);
							projectData.id = (result.data._id == undefined ? '' : result.data._id);
						}
					}
					callback(null, "addProject");
				});
				
			    },
			    function(callback) {
				helper.sendRequest(endPoints.projects.addUserToProject, {
					projectId : projectData.id
				}, empId, null, function(result) {
			    	var projectData;
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							projectList = result.data;
						} 
					} 
					callback(null, "addUserToProject");
				});
				
			    },
			    function(callback) {
			    	helper.sendRequest(endPoints.projects.queryByUserId, null, null, [empId], function(result) {
						if(result && result.meta){
							if(result.meta.status == '200' && result.data){
								userProjectList = result.data;
							} 
						}
						callback(null, "retrieve user projects")
					});
			    	},
			    	function(callback) {
				    	helper.sendRequest(endPoints.projects.query, null, null, null, function(result) {
							if(result && result.meta){
								if(result.meta.status == '200' && result.data){
									projectList = result.data;
								} 
							} 
							res.render('userProjects', { 
								userData : userData,
								projectList : projectList,
								userProjectList : userProjectList
							});
							callback(null, "retrieve all projects")
						});
				    	}
			    
			    ], function(err,results){
				console.log(results);
			});
			
		}
			
	}

module.exports = project;