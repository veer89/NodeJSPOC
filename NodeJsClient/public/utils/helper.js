var rest = require('restler');
var helper = {};

helper = {
	sendRequest : function(endpoint ,data, user_id, params, callback){
		var requestUrl = global._BASEURL + endpoint.end_point ;
		if(params && params.length > 0){
			for(var i = 0;i < params.length; i++){
				requestUrl += '/' + params[i];
			}
		}
		requestUrl += '?appKey=' + global._APPKEY;
		if(user_id) {
			requestUrl += '&user_id=' + user_id;
		}
		rest.request(requestUrl, {
			method : endpoint.method_type,
			data : data
		}).once('complete', function(data, response) {
			callback(JSON.parse(data));
		});
	}
};


module.exports = helper;