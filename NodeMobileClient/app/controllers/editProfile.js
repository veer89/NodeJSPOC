var params = arguments[0] || {}, apiClient = require('apiClient'), endPoints = require('endPoints');

// if ios7, set top as 20
if (Alloy.Globals.iOS7) {
	$.wrapper.top = 20;
	$.bottom.height = 30;
}

function init() {
	// hit the get user profile API
	// declared the parameters
	var apiData = {
		userId : Alloy.Globals.user_id,
		callback : {
			successCallback : userSuccessCallback,
			errorCallback : errorCallback
		}
	};
	apiClient.sendRequest(endPoints.users.showDetails, null, null, [apiData.userId], apiData.callback);
};

/**
 * Function to set user data
 * @param {Object} data
 */
function setUserData(data) {
	$.profilePic.image = (data && data.picture && data.picture.imgUrl) ? data.picture.imgUrl : '/images/defaultProfile.png';
	if(data && data.user){
		$.name.value = data.user.first_name ? data.user.first_name + ' ' + (data.user.last_name ? data.user.last_name : '' ) : '';
		$.designation.value = data.user.designation ? data.user.designation : '';
		$.emailId.value = data.user.emailId ? data.user.emailId : '';
		$.phoneNumber.value = data.user.phone_number ? data.user.phone_number : '';
	}
	var addressResult = data.address ? data.address : null;
	setAddressData(addressResult);
	if(data && data.social){
		$.twitter.value = data.social.twitter ? data.social.twitter : '';
		$.facebook.value = data.social.facebook ? data.social.facebook : '';
		$.linkedIn.value = data.social.linkedIn ? data.social.linkedIn : '';
	}
	if(data && data.projects){
		$.projectName.value = data.projects.projectName ? data.projects.projectName : '';
		$.projectLocation.value = data.projects.projectLocation ? data.projects.projectLocation : '';
		$.projectDuration.value = data.projects.projectDuration ? data.projects.projectDuration : '';
	}
};

/**
 * Function to set Address Details
 */
function setAddressData(addressResult) {
	console.log(" address data " + JSON.stringify(addressResult));
	if (addressResult) {
		for (var i = 0, length = addressResult.length; i < length; i++) {
			var addressData = addressResult[i];
			$["house_number" + (i + 1)].value = addressData.house_number ? addressData.house_number: '';
			$["street" + (i + 1)].value = addressData.street ? addressData.street : '';
			$["city" + (i + 1)].value = addressData.city ? addressData.city : '';
			$["state" + (i + 1)].value = addressData.state ? addressData.state : '';
			$["country" + (i + 1)].value = addressData.country ? addressData.country : '';
			$["pin" + (i + 1)].value = addressData.pin ? addressData.pin : '';
		}
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

/**
 * Error Function on update user info api
 * @param {Object} event
 */
function updateErrorCallback(event) {
	var alertDialog = Ti.UI.createAlertDialog({
		title : event.title ? event.title : 'NodeJSPOC',
		message : event.message ? event.message : 'Error while updating data'
	});
	alertDialog.show();
};

/**
 * Error Function on update user info api
 * @param {Object} event
 */
function updateSuccessCallback(event) {
	var alertDialog = Ti.UI.createAlertDialog({
		title : event.title ? event.title : 'NodeJSPOC',
		message : event.message ? event.message : 'Data successfully updated'
	});
	alertDialog.show();
};

function updatePermanentAddress() {
	var apiData = {
		userId : Alloy.Globals.user_id,
		callback : {
			successCallback : updateSuccessCallback,
			errorCallback : updateErrorCallback
		}
	};
	var addressData = {
		house_number : $.house_number1.value,
		street : $.street1.value,
		city : $.city1.value,
		state : $.state1.value,
		country : $.country1.value,
		pin : $.pin1.value,
	};
	apiClient.sendRequest(endPoints.address.update, addressData, null, [apiData.userId], apiData.callback);
}

function updateTemporaryAddress(){
	var apiData = {
		userId : Alloy.Globals.user_id,
		callback : {
			successCallback : updateSuccessCallback,
			errorCallback : updateErrorCallback
		}
	};
	var addressData = {
		house_number : $.house_number2.value,
		street : $.street2.value,
		city : $.city2.value,
		state : $.state2.value,
		country : $.country2.value,
		pin : $.pin2.value,
	};
	apiClient.sendRequest(endPoints.address.update, addressData, null, [apiData.userId], apiData.callback);
}

function updateSocialLinks(){
	var apiData = {
		userId : Alloy.Globals.user_id,
		callback : {
			successCallback : updateSuccessCallback,
			errorCallback : updateErrorCallback
		}
	};
	var socialData = {
		twitter : $.twitter.value,
		facebook : $.facebook.value,
		linkedIn : $.linkedIn.value,
	};
	apiClient.sendRequest(endPoints.socials.update, socialData, null, [apiData.userId], apiData.callback);
}

function updateProjects() {
	var apiData = {
		userId : Alloy.Globals.user_id,
		callback : {
			successCallback : updateSuccessCallback,
			errorCallback : updateErrorCallback
		}
	};
	var projectData = {
		projectName : $.projectName.value,
		projectLocation : $.projectLocation.value,
		projectDuration : $.projectDuration.value
	};
	apiClient.sendRequest(endPoints.projects.update, projectData, null, [apiData.userId], apiData.callback);
}

// initial logic
init();
