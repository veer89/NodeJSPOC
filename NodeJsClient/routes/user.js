var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');
var async = require('async');

var user = {
		editProfile : function(req, res, next){
			var empId = req.params.id;
			res.render('settings', { empId: empId });
		},
		editAddress : function(req, res, next){
			var empId = req.params.id;
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
						addressData.user_id = empId;
					} else {
						addressData.street = '';
						addressData.city = '';
						addressData.country = '';
						addressData.pin = '';
						addressData.id = 'new';
						addressData.user_id = empId;
					}
				} 
				res.render('editAddress', { 
					addressData : addressData											
				});
			});
		},
		changeAddress : function(req, res, next){
			var addrId = req.params.id;
			var user_id = req.body.user_id;
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
							addressData.user_id = result.data.user_id;
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
							addressData.user_id = result.data.user_id;
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