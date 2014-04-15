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

function initHome(){
	var userProfile = Alloy.createController('userProfile').getView();
	$.index.add(userProfile);
}

Alloy.Globals.mainWindow = $.index;
$.index.open();