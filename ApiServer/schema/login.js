var loginSchema = new _SCHEMA({      
    emailId: { type: String, required: true }, 
    password: { type: String, required: true }, 
    isActive: { type: Boolean }    // need to check for this field
});
exports.loginModel = _MONGODB.model('logins', loginSchema);
