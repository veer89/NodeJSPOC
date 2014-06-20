var schema = require('../schema/exports.js'),
	helper = require('../public/utils/helper.js');

var socialSchema = {};
socialSchema.add = function (req, res, next) {
            var social = new schema.socialModel({
                user_id: req.query.user_id,
                twitter: req.body.twitter,
                facebook: req.body.facebook,
                linkedIn: req.body.linkedIn,
            });
            social.save(function (err, doc) {
                if (err)
                    return next(err);
                if(doc)
                	res.json(helper.genarateResponse(200, doc, null, null));
                else
                	res.json(helper.genarateResponse(400, null, null, 'unable to create social linking'));
            });
}
socialSchema.show = function (req, res, next) {
    schema.socialModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        if(docs)
        	res.json(helper.genarateResponse(200, docs, null, null));
        else
        	res.json(helper.genarateResponse(400, null, null, 'unable to show social linking'));
    });
}
socialSchema.query = function (req, res, next) {
	schema.socialModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        if(docs)
        	res.json(helper.genarateResponse(200, docs, null, null));
        else
        	res.json(helper.genarateResponse(400, null, null, 'unable to query social linking'));
    });
}
socialSchema.update = function (req, res, next) {
    schema.socialModel.findById(req.params.id, function (socialErr, socialData) {
    	if(socialErr)
    		return next(socialErr);
            socialData.twitter = req.body.twitter,
            socialData.facebook = req.body.facebook,
            socialData.linkedIn = req.body.linkedIn,
        socialData.save(function (err, doc) {
            if (err)
                return next(err);
            if(doc)
            	res.json(helper.genarateResponse(200, doc, null, null));
            else
            	res.json(helper.genarateResponse(400, null, null, 'unable to update social linking'));
        });
    });
}
socialSchema.delete = function (req, res, next) {
    schema.socialModel.findById(req.params.id, function (socialErr, social) {
    	if(socialErr)
    		return next(socialErr);
        social.remove(function (err, docs) {
            if (err)
                return next(err);
            if(doc)
            	res.json(helper.genarateResponse(200, docs, null, null));
            else
            	res.json(helper.genarateResponse(400, null, null, 'unable to delete social linking'));
        });
    });
}
module.exports = socialSchema;
