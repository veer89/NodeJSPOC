var loginSchema = new _SCHEMA({      
    emailId: { type: String, required: true }, 
    password: { type: String, required: true }, 
    isActive: { type: Boolean },    
    user_id: { type: String },    
    activationCode: { type: String }    
});
exports.loginModel = _MONGODB.model('logins', loginSchema);
