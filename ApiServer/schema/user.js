var userSchema = new _SCHEMA({
    empId: String,
    first_name: String,
    last_name: String,
    phone_number: Number,
    designation: String,
    salary: String,
    emailId: String,
    profileId: String,
    address: {
    	street: String,
    	city: String,
    	country: String,
    	pin: Number
    }
});
exports.userModel = _MONGODB.model('users', userSchema);
