 var http = require('http');

/**
 * Function to hit API server
 * NOTE: Currently BASE_URL is pointing to local port.Change it to production after
 * development phase
 * @param {Object} endpoint : Contains endpoint object
 * @param {Object} data : which needs to be send as body
 * @param {Object} user_id : where user_id needs to be checked before any operation
 * @param {Object} urlParams[array] : param which needs to send as querystring in URL
 * @param {Object} callback: Success and Error callbacks * 
 */
exports.sendRequest = function(endpoint, data, user_id, urlParams, callback) {
	var requestUrl = Alloy.CFG.BASE_URL + endpoint.end_point;
	// map the query string parameters
	if (urlParams && urlParams.length > 0) {
		for (var i = 0; i < urlParams.length; i++) {
			requestUrl += '/' + urlParams[i];
		}
	}
	requestUrl += '?appKey=' + Alloy.CFG.APP_KEY;
	
	// bind the user id, if needs to be filter out
	if (user_id) {
		requestUrl += '&user_id=' + user_id;
	}
	
	console.log("requestURL " + requestUrl);
	
	// request parameters
	var params = {		
		type : endpoint.method_type,
		format: endpoint.format,
		url : requestUrl,
		data : data,
		failure : callback.errorCallback,
		success : callback.successCallback
	};
	http.request(params); 
};

