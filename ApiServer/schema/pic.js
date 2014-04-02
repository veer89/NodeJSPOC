var picSchema = new _SCHEMA({
    empId: {type: String, unique: true},
    img: {
    	data: Buffer,
    	contentType: String
    }
    
});
exports.picModel = _MONGODB.model('picture', picSchema);
