var projectSchema = new _SCHEMA({
    projectName: { type: String, required: true , unique: true},
    projectLocation: String,
    projectDuration: String,
    user_id : [ { type: String } ]
});
exports.projectModel = _MONGODB.model('projects', projectSchema);
