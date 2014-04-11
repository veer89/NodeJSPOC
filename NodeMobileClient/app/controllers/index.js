if(Alloy.Globals.iOS7){
	$.index.top = 20;
}
var userProfile = Alloy.createController('userProfile').getView();
$.index.add(userProfile);
$.index.open();
