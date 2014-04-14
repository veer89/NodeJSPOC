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
		showImage : function(req, res, next){
			var empId = req.session.user_id;
			helper.sendRequest(endPoints.picture.show, null, null, [empId], function(result) {
		    	//var addressData = 'No Data Found';
				if(result && result.meta){
					if(result.meta.status == '200'){
						res.writeHead(200, {'Content-Type': 'image/png'});
						res.write(new Buffer(result.data.img.data));
						res.end();
					} else {
						res.writeHead(200, {'Content-Type': 'image/png'});
						res.write(new Buffer(require('fs').readFileSync('public/defaultProfile.png')));
						res.end();
					}
				} 
			});
		},
		editProfile : function(req, res, next){
			var empId = req.session.user_id;
			res.render('settings', { empId: empId });
		},
		editAddress : function(req, res, next){
			var empId = req.session.user_id;
			var addressData = {};
			helper.sendRequest(endPoints.address.showByEmpId, null, null, [empId], function(result) {
		    	//var addressData = 'No Data Found';
				if(result && result.meta){
					if(result.meta.status == '200' && result.data){
						addressData.street = (result.data.street == undefined ? '' : result.data.street);
						addressData.city = (result.data.city == undefined ? '' : result.data.city);
						addressData.country = (result.data.country == undefined ? '' : result.data.country);
						addressData.pin = (result.data.pin == undefined ? '' : result.data.pin);
						addressData.id = (result.data._id == undefined ? '' : result.data._id);
						//addressData.user_id = empId;
					} else {
						addressData.street = '';
						addressData.city = '';
						addressData.country = '';
						addressData.pin = '';
						addressData.id = 'new';
						//addressData.user_id = empId;
					}
				} 
				res.render('editAddress', { 
					addressData : addressData											
				});
			});
		},
		changeAddress : function(req, res, next){
			var addrId = req.body.addrId;
			var user_id = req.session.user_id;
			console.log("user_ID   "+user_id)
			var addressData = {};
			var data = {
					street : req.body.street,
					city : req.body.city,
					country : req.body.country,
					pin : req.body.pin
			}
			if(addrId != 'new'){
				helper.sendRequest(endPoints.address.update, data, user_id, [addrId], function(result) {
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							addressData.street = (result.data.street == undefined ? '' : result.data.street);
							addressData.city = (result.data.city == undefined ? '' : result.data.city);
							addressData.country = (result.data.country == undefined ? '' : result.data.country);
							addressData.pin = (result.data.pin == undefined ? '' : result.data.pin);
							addressData.id = (result.data._id == undefined ? '' : result.data._id);
							//addressData.user_id = req.session.user_id;
						}
					}
					res.render('editAddress', { 
						addressData : addressData											
					});
				});
			} else {
				helper.sendRequest(endPoints.address.create, data, user_id, null, function(result) {
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							addressData.street = (result.data.street == undefined ? '' : result.data.street);
							addressData.city = (result.data.city == undefined ? '' : result.data.city);
							addressData.country = (result.data.country == undefined ? '' : result.data.country);
							addressData.pin = (result.data.pin == undefined ? '' : result.data.pin);
							addressData.id = (result.data._id == undefined ? '' : result.data._id);
							//addressData.user_id = req.session.user_id;
						}
					}
					res.render('editAddress', { 
						addressData : addressData											
					});
				});
			}
			
		}
};

module.exports = user;