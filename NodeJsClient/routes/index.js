var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');
var async = require('async');

var index = {};




index = {
		getIndex : function(req, res, next){   
			res.render('index', { title: 'Express' });
		},
		getProfilePage : function(req, res, next){ 
			var empId = req.query.empId;
			var profileData = {};
			async.series([function(callback) {
				// gether data
				helper.sendRequest(endPoints.users.showById, null, null, [empId], function(result) {
					if(result && result.meta){
						if(result.meta.status == '200'){
							profileData.first_name = result.data.first_name;
							profileData.last_name = result.data.last_name;
							profileData.phone_number = result.data.phone_number;
							profileData.designation = result.data.designation;
							profileData.emailId = result.data.emailId;
							console.log(profileData);
						}
					}
					callback(null, "users");
				});
				
			    },
			    function(callback) {
			    helper.sendRequest(endPoints.address.showById, null, null, [empId], function(result) {
			    	var addressData = 'No Data Found';
					if(result && result.meta){
						if(result.meta.status == '200' && result.data){
							addressData = result.data.street + ', ' + result.data.city +', ' + result.data.country +' - ' + result.data.pin;
						}
					}
					profileData.addressData = addressData;
				    callback(null, "address");
				});
			    },
			    function(callback){
			    	res.render('profilePage', { profileData: profileData });
			    	callback(null, "profile");
			    }], function(err, results) {
					console.log(results);
			});
		},
		signup : function(req, res, next){
			var data = {
				password : req.body.password,
				empId : req.body.empId,
				emailId : req.body.emailId,
				first_name: req.body.first_name,
		        last_name: req.body.last_name,
		        phone_number: req.body.phone_number,
		        designation: req.body.designation
			};
			helper.sendRequest(endPoints.users.create, data, null, null, function(result) {
				if (result && result.meta) {
					if (result.meta.status == '200') {
						res.redirect('/profile?empId='+req.body.empId);
					} else {
						res.send('Error Occured');
					}

				}
			});
			
		}
}
module.exports = index;