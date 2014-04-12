var picSchema = new _SCHEMA({
	user_id: {type:String, required :true},
	name: String,
    img: {
    	data: Buffer,
    	contentType: String
    },
    img_url: String
});
exports.pictureModel = _MONGODB.model('pictures', picSchema);
