/**
var userProfile = Alloy.createController('userProfile').getView();
$.index.add(userProfile);
$.index.open();
**/


Alloy.Globals.Login = Alloy.createWidget("com.appcelerator.acslogin");
Alloy.Globals.Login.init({
		loginCallback: initHome
	});
	
$.index.add(Alloy.Globals.Login.getView());

function initHome(userData){
	var loginData = {
		emailId : userData.username,
		password : userData.password
	}; 
	var	callback = {
			successCallback : userSuccessCallback,
			errorCallback : errorCallback
	};
	apiClient.sendRequest(endPoints.login.login, loginData, null, null, callback);	
}

/**
 * Success Function on get user info API
 * @param {Object} response
 */
function userSuccessCallback(response) {
	console.log('success' + JSON.stringify(response));
	if (response.meta.status == '200') {
		var userProfile = Alloy.createController('userProfile').getView();
	    $.index.add(userProfile);
	} else {
		errorCallback({
			message : response.meta.message
		});
	}

};

/**
 * Error Function on get user info api
 * @param {Object} event
 */
function errorCallback(event) {
	var alertDialog = Ti.UI.createAlertDialog({
		title : "error",
		message :  'Found error while loading data'
	});
	alertDialog.show();
};


Alloy.Globals.mainWindow = $.index;
$.index.open();