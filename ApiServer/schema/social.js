var socialSchema = new _SCHEMA({
    user_id: {type:String, required :true},
    twitter: String,
    facebook: String,
    linkedIn: String,
});
exports.socialModel = _MONGODB.model('socials', socialSchema);