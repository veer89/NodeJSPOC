var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');

var index = {};

index = {
		getIndex : function(req, res, next){   
			res.render('index', { title: 'Express' });
		},
		getProfilePage : function(req, res, next){ 
			var empId = req.query.empId;
			helper.sendRequest(endPoints.users.showById, null, null, [empId], function(result) {
				if (result && result.meta) {
					if (result.meta.status == '200') {
						var user_id = result.data._id;
						var addressData = 'No Data Found';
						helper.sendRequest(endPoints.address.showById, null, null, [user_id], function(result) {
							if(result && result.meta){
								if(result.meta.status == '200'){
									addressData = result.data.street + ', ' + result.data.city +', ' + result.data.country +' - ' + result.data.pin;
								}
								var profileData = {
										first_name : result.data.first_name,
										last_name : result.data.last_name,
										phone_number: result.data.phone_number,
									    designation: result.data.designation,
									    emailId: result.data.emailId,
									    addressData : addressData
								}
								res.render('profilePage', { profileData: profileData });
							}
						});
					} else {
						res.send('Error Occured');
					}

				}
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