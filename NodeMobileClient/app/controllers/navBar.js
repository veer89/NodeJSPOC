var args = arguments[0] || {};

if(args){
	$.backBtn.visible = args.backBtn;
	$.settings.visible = args.settings;
}

// if title param available, set it
if(args.title){
	$.header.text = args.title;
}

/**
 * ************************************
 * EVENT LISTENERS
 * ************************************
 */
function closeEdit(){
	Alloy.Globals.mainWindow.remove(Alloy.Globals.mainWindow.children[Alloy.Globals.mainWindow.children.length-1]);
}

function editProfile(){
	var editProfile = Alloy.createController('editProfile').getView();
	Alloy.Globals.mainWindow.add(editProfile);
}
