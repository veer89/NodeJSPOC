var params = arguments[0] || {}, apiClient = require('apiClient'), endPoints = require('endPoints');

// if ios7, set top as 20
if (Alloy.Globals.iOS7) {
	$.wrapper.top = 20;
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
	console.log("user data " + JSON.stringify(data));
	var userData = data.user;
	$.profilePic.image = (userData && userData.img && userData.img.data) ? userData.img.data : '/images/defaultProfile.png';
	//check image property later
	$.name.text = userData && userData.first_name ? userData.first_name + ' ' + (userData.last_name ? userData.last_name : '' ) : 'NA';
	$.designation.text = userData && userData.designation ? userData.designation : 'NA';
	$.empId.text = userData && userData.empId ? userData.empId : 'NA';
	$.emailId.text = userData && userData.emailId ? userData.emailId : 'NA';
	$.phoneNumber.text = userData && userData.phone_number ? userData.phone_number : 'NA';
	
	
	// set Project Result
	var projectResult = data && data.projects ? data.projects : null;
	setProjectData(projectResult);
		
	// set address Result 
	var addressResult = data.address ? data.address : null;
	setAddressData(addressResult);

};


/**
 * Function to set Project Details
 */
function setProjectData(projectResult){	
	for(var i=0, length = projectResult.length; i< length; i++){		
		if(i > 0){
			$.project.text = ", " + projectResult[i].projectName;
		}else{
			$.project.text = projectResult[i].projectName;
		}
	}
	
	if ($.project.text == '') {
		$.name.top = 30;
	}
	
	// set project data
	$.project.rowData = projectResult;
};

/**
 * Function to set Address Details
 */
function setAddressData(addressResult) {
	console.log(" address data " + JSON.stringify(addressResult));
	if (addressResult) {
		for (var i = 0, length = addressResult.length; i < length; i++) {
			var addressData = addressResult[i];
			var address = addressData && addressData.street ? addressData.street + ', ' : '';
			address += addressData.city ? addressData.city + ', ' : '';
			address += addressData.state ? addressData.state + ', ' : '';
			address += addressData.country ? addressData.country + ', ' : '';
			address += addressData.pin ? addressData.pin : '';

			$["address" + (i+1)].text = address;
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
 * EVENT LISTENERS
 */
function openProjectDetails(_event){	
	if(_event.source.rowData){
		var detailWin = Alloy.createController('addressDetails', { projectData: _event.source.rowData}).getView();		
		detailWin.open();
	}
};

// initial logic
init();
