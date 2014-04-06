var projectSchema = new _SCHEMA({
    projectName: String,
    projectLocation: String,
    projectDuration: String,
    user_id : [ { type: String } ]
});
exports.projectModel = _MONGODB.model('projects', projectSchema);