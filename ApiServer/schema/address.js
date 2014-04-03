var addressSchema = new _SCHEMA({
    	street: String,
    	city: String,
    	country: String,
    	pin: Number,
    	user_id: String,
    	empId: String
});
exports.addressModel = _MONGODB.model('address', addressSchema);
