var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');
var async = require('async');

var index = {};




index = {
		getIndex : function(req, res, next) {
		res.render('index', {
			showMsg : 'hideErrorMessage',
			errorMsg : '',
			emailId : '',
			password : ''
		});
	},
		getProfilePage : function(req, res, next){ 
			var empId = req.session.user_id
			var profileData = {};
			helper.sendRequest(endPoints.users.showDetails, null, null, [empId], function(result) {
				if (result && result.meta) {
					if (result.meta.status == '200') {
						req.session.userObj = result.data;
						res.render('profilePage', { profileData: result.data });
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
						req.session.user_id = result.data._id;
						res.redirect('/profile');
					} else {
						res.send('Error Occured');
					}

				}
			});
			
		},
		signin : function(req, res, next){
				var password = req.body.password,
					emailId = req.body.emailId;
				var data =  {
					emailId : emailId,
					password : password
				};
				helper.sendRequest(endPoints.login.login, data, null, null, function(result) {
					if (result && result.meta) {
						if (result.meta.status == '200') {
							console.log(result);
							req.session.user_id = result.data.user_id;
							res.redirect('/profile');
						} else {
							res.render('index', { showMsg: 'showErrorMessage', errorMsg :  result.meta.message,
													emailId : emailId, password : password});
						}

					}
				});
				
			}
}
module.exports = index;