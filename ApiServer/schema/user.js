var userSchema = new _SCHEMA({
    empId: { type: String, required: true , unique: true},
    first_name: String,
    last_name: String,
    phone_number: Number,
    designation: String,
    experience : String,
    emailId: { type: String, required: true , unique: true}
});
exports.userModel = _MONGODB.model('users', userSchema);
