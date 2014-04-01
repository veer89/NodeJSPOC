var socialSchema = new _SCHEMA({
    empId: {type: String, unique: true},
    user_Id: String,
    twitter: String,
    facebook: String,
    linkedIn: String,
});
exports.socialModel = _MONGODB.model('socials', socialSchema);