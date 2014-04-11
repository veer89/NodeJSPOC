var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');
var async = require('async');

var user = {
		editProfile : function(req, res, next){
			var empId = req.params.id;
			res.render('settings', { empId: empId });
		}
};

module.exports = user;