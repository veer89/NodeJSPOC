var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js');

var pictureSchema = {};
pictureSchema.add = function (req, res, next) {
    var picture;
    console.log("data  ",req.body.data);
    picture = new schema.pictureModel({
        user_id: req.query.user_id,
        name: req.body.name,
        img: { data: require('fs').readFileSync(req.body.data),
            contentType: 'image/png'
        }
    });
    picture.save(function (err, doc) {
        if (err)
            return next(err);
        res.json(helper.genarateResponse(200, doc, null, null));
    });
}
pictureSchema.show = function (req, res, next) {
    schema.pictureModel.findOne({user_id : req.params.id}, function (err, docs) {
        if (err)
            return next(err);
        if(docs){
        	res.json(helper.genarateResponse(200, docs, null, null));
        } else {
        	res.json(helper.genarateResponse(404, docs, null, null));
        }
        /*res.contentType(docs.img.contentType);
        res.send(docs.img.data);*/
    });
}
pictureSchema.update = function (req, res, next) {
    schema.pictureModel.findById(req.params.id, function (picErr, userPic) {
        if (picErr)
            return next(picErr);
        userPic.img.data = require('fs').readFileSync(req.body.data);
        userPic.name = req.body.name;
        userPic.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(helper.genarateResponse(200, null, "Picture updated successfully", null));
        });
    });
}

pictureSchema.delete = function (req, res, next) {
    schema.pictureModel.findById(req.params.id).remove(function (err, docs) {
        if (err)
            return next(err);
        res.json(helper.genarateResponse(200, null, "Picture deleted successfully", null));
    });
}
module.exports = pictureSchema;