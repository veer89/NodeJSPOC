var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');
var async = require('async');

var user = {
		uploadImage : function(req, res, next){
			var empId = req.session.user_id;
			var pictureExist = false;
			var pictureId = '';
			//var fileData = req.files.photo.path;
			var name = "photo.png";
			var data = {
					name : name,
					path : req.files.photo.path
			}
			async.series([function(callback) {
				helper.sendRequest(endPoints.picture.query, null, null, [empId], function(result) {
					if(result && result.meta){
						if(result.meta.status == '200'){
							pictureExist = true;
							pictureId = result.data._id;
						}
					} 
					callback(null, "users");
				});
				
			    },
			    function(callback) {
			    	if(!pictureExist){
			    		helper.sendRequest(endPoints.picture.create, data, empId, null, function(result) {
							if(result && result.meta){
								if(result.meta.status == '200'){
									res.redirect('/profile');
								}
							}
							callback(null, "new picture");
						});
			    	} else {
			    		helper.sendRequest(endPoints.picture.update, data, empId, [pictureId], function(result) {
							if(result && result.meta){
								if(result.meta.status == '200'){
									res.redirect('/profile');
								}
							}
							callback(null, "update picture");
						});
			    	}
					
				    }
			    
			    ], function(err,results){
				console.log(results);
			});
		},
		editProfile : function(req, res, next){
			var empId = req.session.user_id;
			res.render('settings', { empId: empId });
		}
};

module.exports = user;