var params = arguments[0] || {};

//projectInfo
var data = params.projectInfo;
// set the data
$.projectName.text = data.projectName;
$.duration.text = data.projectDuration;
$.location.text = data.projectLocation;