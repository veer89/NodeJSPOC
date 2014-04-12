var addressSchema = new _SCHEMA({
    	house_number:String, 
		street: String,
    	city: String,
    	pin: Number,
    	state: String,
    	country: String,
    	user_id: {type:String, required :true},
    	
});
exports.addressModel = _MONGODB.model('address', addressSchema);
