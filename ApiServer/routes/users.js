var schema = require('../schema/exports.js');
var userSchema = {};
userSchema.add = function (req, res, next) {
    var user = new schema.userModel({
        empId: req.body.empId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        designation: req.body.designation,
        salary: req.body.salary,
        emailId: req.body.emailId,
        profileId: req.body.profileId
    });
    user.save(function (err, doc) {
        if (err)
            return next(err);
        res.json(doc);
    });
}
userSchema.show = function (req, res, next) {
	schema.userModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
}
userSchema.query = function (req, res, next) {
	schema.userModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
}
userSchema.update = function (req, res, next) {
	schema.userModel.findById(req.params.id, function (err, userData) {
            userData.empId = req.body.empId,
            userData.first_name = req.body.first_name,
            userData.last_name = req.body.last_name,
            userData.phone_number = req.body.phone_number,
            userData.designation = req.body.designation,
            userData.salary = req.body.salary,
            userData.emailId = req.body.emailId,
            userData.profileId = req.body.profileId
        userData.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(doc);
        });
    });
}
userSchema.delete = function (req, res, next) {
	schema.userModel.findById(req.params.id, function (err, user) {
        user.remove(function (err, docs) {
            if (err)
                return next(err);
            res.json(docs);
        });
    });
}
module.exports = userSchema;
