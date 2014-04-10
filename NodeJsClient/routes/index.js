var rest = require('restler');
var helper = require('../public/utils/helper.js');
var endPoints = require('../endPoints.json');

var index = {};
index.getIndex = function(req, res, next){   
	res.render('index', { title: 'Express' });
};

index = {
		signup = function(req, res, next){
			var data = {
				password : req.body.password,
				empId : req.body.username,
				emailId : req.body.email
			};
			helper.sendRequest(endPoints.users.create, data, null, null, function(result) {
				if (result && result.meta) {
					if (result.meta.status == '200') {
						res.send('Created');
					} else {
						res.send('Error Occured');
					}

				}
			});
			
		}
}
module.exports = index;