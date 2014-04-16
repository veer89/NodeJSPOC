var params = arguments[0] || {};

// if ios7, set top as 20
if (Alloy.Globals.iOS7) {
	$.detailWin.top = 20;
}

function init(){
	for(var i=0, length = params.projectData.length; i< length; i++){
		var addressTemplate = Alloy.createController('addressTemplate', { projectInfo : params.projectData[i]}).getView();
		$.container.add(addressTemplate);
	}
};

//EVENT LISTENERS
$.navBar.backBtn.addEventListener('singletap', function(){
	$.detailWin.close();
});

// initialize the logic
init();
