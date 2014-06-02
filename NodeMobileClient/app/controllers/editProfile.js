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
		userId : Alloy.Globals.user_id, //TODO: remove hard coded local value
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
	if(data && data.address){
		$.house_number.value = data.address.house_number ? data.address.house_number: '';
		$.street.value = data.address.street ? data.address.street : '';
		$.city.value = data.address.city ? data.address.city : '';
		$.state.value = data.address.state ? data.address.state : '';
		$.country.value = data.address.country ? data.address.country : '';
		$.pin.value = data.address.pin ? data.address.pin : '';
	}
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
