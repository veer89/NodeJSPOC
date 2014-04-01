var projectSchema = new _SCHEMA({
    projectName: String,
    projectLocation: String,
    projectDuration: String,
    empId : [ { type: String } ]
});
exports.projectModel = _MONGODB.model('projects', projectSchema);