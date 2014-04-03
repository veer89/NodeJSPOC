var userSchema = new _SCHEMA({
    empId: { type: String, required: true },
    first_name: String,
    last_name: String,
    phone_number: Number,
    designation: String,
    salary: String,
    emailId: { type: String, required: true },
    profileId: String
});
exports.userModel = _MONGODB.model('users', userSchema);
