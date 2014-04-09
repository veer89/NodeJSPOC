var rest = require('restler');
var helper = {};

helper = {
	sendRequest : function(endpoint ,data, user_id, callback){
		var requestUrl = global._BASEURL + endpoint.end_point 
						+ '?appKey=' + global._APPKEY;
		if(user_id) {
			requestUrl += '&user_id=' + user_id;
		}
		if(endpoint.method_type == 'POST'){
			rest.post(requestUrl, {
				data : data,
			}).once('complete', function(data, response) {
				callback(data);
			});
		} else if(endpoint.method_type == 'GET'){
			rest.get(requestUrl).once('complete', function(data, response) {
				callback(data);
			});
		}
	}
};


module.exports = helper;