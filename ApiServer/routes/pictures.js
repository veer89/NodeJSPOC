var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js'),
    mongoose = require('mongoose');

var pictureSchema = {};
pictureSchema.add = function (req, res, next) {
	var uniqueId = mongoose.Types.ObjectId();
	var imgUrl = req.protocol + "://" + req.headers.host + "/pictures/show/" + uniqueId + "?appKey=" + _APPKEY;
    var picture = new schema.pictureModel({
    	_id: uniqueId,
    	img_url: imgUrl,
        user_id: req.query.user_id,
        name: req.body.name,
        img: { data: require('fs').readFileSync(req.files.photo.path),
            contentType: 'image/png'
        }
    });
    picture.save(function (err, doc) {
        if (err)
            return next(err);
        var responseObj = null;
        if(doc){
          responseObj = {
        		_id : doc._id,
        		imgUrl : doc.img_url ,
        		user_id: doc.user_id,
        		name : doc.name
        };
          res.json(helper.genarateResponse(200, responseObj, null, null));  
        }else
        	res.json(helper.genarateResponse(400, null, null, 'unable to create picture'));	
        
    });
}
pictureSchema.show = function (req, res, next) {
    schema.pictureModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        if(docs){
        res.contentType(docs.img.contentType);
        res.send(docs.img.data);
        }
        else
        	res.send("no image");	
    });
};
pictureSchema.update = function (req, res, next) {
    schema.pictureModel.findById(req.params.id, function (picErr, userPic) {
        if (picErr)
            return next(picErr);
        userPic.img.data = require('fs').readFileSync(req.files.photo.path);
        userPic.name = req.body.name;
        userPic.save(function (err, doc) {
            if (err)
                return next(err);
            var responseObj = null;
            if(doc){
             responseObj = {
            		_id : doc._id,
            		imgUrl : doc.img_url ,
            		user_id: doc.user_id,
            		name : doc.name
            };
             res.json(helper.genarateResponse(200, responseObj, null, null)); 
            }else
             res.json(helper.genarateResponse(400, null, null, 'unable to update picture'));	
        });
    });
}

pictureSchema.delete = function (req, res, next) {
    schema.pictureModel.findById(req.params.id).remove(function (err, docs) {
        if (err)
            return next(err);
        if(docs)
        	res.json(helper.genarateResponse(200, null, 'picture deleted successfully', null));
        else
        	res.json(helper.genarateResponse(400, null, null, 'unable to delete picture'));
    });
}
module.exports = pictureSchema;