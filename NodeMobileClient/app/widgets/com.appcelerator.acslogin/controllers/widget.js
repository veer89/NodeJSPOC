
var settings = {
	loginCallback: null,
 	createCallback: null,
 	resetPwdCallback:null
};

var actInd;
var actIndParent;

$.forgotPwd = function() {
  forgotPwd();
};

$.loginClick = function() {
  loginClick();
};
//Create activity indicator for buttons
function activityIndicator(){
	var style;
	if (OS_IOS){
	  style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	}
	else {
	  style = Ti.UI.ActivityIndicatorStyle.DARK;
	}
	return Ti.UI.createActivityIndicator({
		color:"#ffffff",
	  	style:style,
	  	height:Ti.UI.SIZE,
	  	width:Ti.UI.SIZE
	});
	 
}

function loginClick() {
	if($.usernameTxt.value && $.passwordTxt.value){
		$.usernameTxt.blur();
	    $.passwordTxt.blur();
	    $.loginLbl.text = "";
	   if (!actInd) {
			actInd = activityIndicator();
		}

		$.loginBtn.add(actInd);
		actIndParent = 'loginBtn';
		actInd.show();		
	   
	    settings.loginCallback && settings.loginCallback({
	    	username: $.usernameTxt.value,
	    	password: $.passwordTxt.value
	    });
	}else {
		alert("Please provide your credentials.");
	}
  
}

//Hide the activity indicator placed on the login button.
$.hideActivityIndicator = function(){
   if(actInd != null){				
   		$[actIndParent].remove(actInd);
   		$.loginLbl.text = "Login";
   } 
};

function forgotPwd() {
	var alertDialog = Ti.UI.createAlertDialog({
		message :  'Are You sure. Want to Reset Password?',
		buttonNames: ['Yes', 'No']
	});
	alertDialog.show(); 
	alertDialog.addEventListener('click', function(e){
    Ti.API.info('e.index: ' + e.index);
    if(e.index==0) {
    	if($.usernameTxt.value)
    	{
    		Ti.API.info('username ' + $.usernameTxt.value);
    		settings.resetPwdCallback && settings.resetPwdCallback({
	    	emailId: $.usernameTxt.value
	    });
    	}
    	else{
    		alert("Please enter valid user name");
    	}
    }
  });
  
}


function focusStyle(evt){
	evt.source.backgroundImage = "/common/field-bg-focused.png";
	
}

function blurStyle(evt){
	evt.source.backgroundImage = "/common/field-bg.png";
}

function focusPassword(){
    $.passwordTxt.focus();
}

Ti.App.addEventListener("keyboardframechanged",moveLoginContainer);

function moveLoginContainer(evt){
	if (Ti.App.keyboardVisible) {
		$.loginContainer.animate({
			center: {
				x: Ti.Platform.displayCaps.platformWidth / 2,
				// Accomodate status bar height on iPad...
				y: (Ti.Platform.osname === "ipad") ? ((Ti.Platform.displayCaps.platformHeight - evt.keyboardFrame.height) / 2) - 10 : ((Ti.Platform.displayCaps.platformHeight - evt.keyboardFrame.height) / 2)
			}, 
			duration: 250
		});
	} else{
		$.loginContainer.animate({
			center: {
				x: Ti.Platform.displayCaps.platformWidth / 2,
				y: Ti.Platform.displayCaps.platformHeight / 2
			},
			duration: 250
		});
	}
}

$.init = function(params) {
	settings.loginCallback = params.loginCallback;
	settings.resetPwdCallback = params.resetPwdCallback;
};

$.open = function(){
	if(OS_IOS){
		setTimeout(function() {
				// timeout only to delay initial animation (fake start)
				$.loginContainer.animate({
					height: 361, 
					duration: 250
				}, function() {
					$.acsLogin.animate({ opacity:1.0, duration:250 });
					$.divider.animate({ opacity:1.0, duration: 250 });
					$.loginContainer.height = 361;
				});
		}, 1000);
	} else {
		$.loginContainer.height  = 361; 
		$.acsLogin.opacity = 1.0;
		$.divider.opacity =1.0;
	}
};


$.close = function(){
	
	Ti.App.removeEventListener("keyboardframechanged",moveLoginContainer);
	$.destroy();
	Alloy.CFG.skipLogin = false;
};

$.open();
