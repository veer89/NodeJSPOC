var schema = require('../schema/exports.js');

var socialSchema = {};
socialSchema.checkUser = function(userId, res){
    console.log(userId);
    schema.userModel.findById(userId, function (err, docs) {
        if (err)
            return next(err);
        res(docs);
    });
}
socialSchema.add = function (req, res, next) {
    socialSchema.checkUser(req.body.user_Id, function(docs){
        if(docs && docs.empId){
            var social = new schema.socialModel({
                empId: req.body.empId,
                user_Id: req.body.user_Id,
                twitter: req.body.twitter,
                facebook: req.body.facebook,
                linkedIn: req.body.linkedIn,
            });
            social.save(function (err, doc) {
                if (err)
                    return next(err);
                res.json(doc);
            });
        }
    });
}
socialSchema.show = function (req, res, next) {
    schema.socialModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
}
socialSchema.query = function (req, res, next) {
	schema.socialModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
}
socialSchema.update = function (req, res, next) {
    schema.socialModel.findById(req.params.id, function (err, socialData) {
            socialData.empId = req.body.empId,
            socialData.twitter = req.body.twitter,
            socialData.facebook = req.body.facebook,
            socialData.linkedIn = req.body.linkedIn,
        socialData.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(doc);
        });
    });
}
socialSchema.delete = function (req, res, next) {
    schema.socialModel.findById(req.params.id, function (err, social) {
        social.remove(function (err, docs) {
            if (err)
                return next(err);
            res.json(docs);
        });
    });
}
module.exports = socialSchema;
