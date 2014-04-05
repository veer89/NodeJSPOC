var picSchema = new _SCHEMA({
    empId: {type: String},
    img: {
    	data: Buffer,
    	contentType: String
    }
});
exports.pictureModel = _MONGODB.model('pictures', picSchema);
