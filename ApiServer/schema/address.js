var addressSchema = new _SCHEMA({
    	street: String,
    	city: String,
    	country: String,
    	pin: Number,
    	user_id: {type:String, required :true}
});
exports.addressModel = _MONGODB.model('address', addressSchema);
