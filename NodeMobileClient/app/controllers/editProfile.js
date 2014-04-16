var params = arguments[0] || {}, apiClient = require('apiClient'), endPoints = require('endPoints');

// if ios7, set top as 20
if (Alloy.Globals.iOS7) {
	$.wrapper.top = 20;
}

function init() {
	// hit the get user profile API

	// declared the parameters
	var apiData = {
		userId : params.userId ? params : "5348d3098337140000bbc0df", //TODO: remove hard coded local value
		callback : {
			successCallback : userSuccessCallback,
			errorCallback : errorCallback
		}
	};
	//apiClient.sendRequest(endPoints.users.show, null, null, [apiData.userId], apiData.callback);

	// declared the parameters
	var apiAddressData = {
		userId : params.userId ? params : "5348d3098337140000bbc0df", //TODO: remove hard coded local value
		callback : {
			successCallback : addressSuccessCallback,
			errorCallback : errorCallback
		}
	};
	//apiClient.sendRequest(endPoints.address.showByEmpId, null, null, [apiData.userId], apiAddressData.callback);

};

/**
 * Function to set user data
 * @param {Object} data
 */
function setUserData(data) {
	$.profilePic.image = (data && data.img && data.img.data) ? data.img.data : '/images/defaultProfile.png';
	//check image property later
	$.name.text = data && data.first_name ? data.first_name + ' ' + (data.last_name ? data.last_name : '' ) : 'NA';
	$.designation.text = data && data.designation ? data.designation : 'NA';
	$.empId.text = data && data.empId ? data.empId : 'NA';
	$.emailId.text = data && data.emailId ? data.emailId : 'NA';
	$.phoneNumber.text = data && data.phone_number ? data.phone_number : 'NA';
};

/**
 * Success Function on get address API
 * @param {Object} response
 */
function addressSuccessCallback(response) {
	console.log('success' + JSON.stringify(response));
	if (response.meta.status == '200') {
		var data = response.data;
		var address = data.street ? data.street + ' ' + (data.city ? data.city : '' + ' ' + (data.pin ? data.pin : '' + ' ' + (data.country ? data.country : ''))) : 'NA';
		$.address.text = address;
	} else {
		errorCallback({
			message : "No data found for this user"
		});
	}

};

/**
 * Success Function on get user info API
 * @param {Object} response
 */
function userSuccessCallback(response) {
	console.log('success' + JSON.stringify(response));
	if (response.meta.status == '200') {
		var data = response.data;
		//TODO: check for array and JSON object
		setUserData(data);
	} else {
		errorCallback({
			message : "No data found for this user"
		});
	}

};

/**
 * Error Function on get user info api
 * @param {Object} event
 */
function errorCallback(event) {
	var alertDialog = Ti.UI.createAlertDialog({
		title : event.title ? event.title : 'NodeJSPOC',
		message : event.message ? event.message : 'Found error while loading data'
	});
	alertDialog.show();
};

// initial logic
init();
