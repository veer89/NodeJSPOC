var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js');

var userSchema = {};
userSchema.add = function (req, res, next) {
    if (!req.body.password)
        return next(new Error("password required"));
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
        else {
        	helper.hash(req.body.password, function (err, salt, hash) {
                var login = new schema.loginModel({
                    emailId: doc.emailId,
                    hash: hash,
                    salt: salt,
                    isActive: req.params.activate == "true" ? false : true,
                    user_id: doc._id,
                    activationCode: helper.getActivationCode(doc.emailId)
                });
                login.save(function (loginErr, loginData) {
                    if (loginErr) {
                        schema.userModel.findById(doc._id, function (err, user) {
                            user.remove(function (removeErr, removeDocs) {
                                return next(loginErr);
                            });
                        });
                    } else {
                        if (req.params.activate == "true") {
                            var activationLink = req.protocol + "://" + req.headers.host + "/users/activate?code=" + loginData.activationCode + "&email=" + loginData.emailId + "&userId=" + loginData.user_id;
                            helper.sendEmail("Activation Mail", loginData.emailId, activationLink, function () {
                                res.json({success: 'Activation link is sent to user email id ,Please click it to activate acccount!'});
                            });
                        }
                        else
                            res.json(doc);
                    }
                });
            });
        }
    });
};
userSchema.show = function (req, res, next) {
    schema.userModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
};
userSchema.query = function (req, res, next) {
    schema.userModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
};
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
};
userSchema.delete = function (req, res, next) {
    schema.userModel.findById(req.params.id, function (err, user) {
        user.remove(function (err, docs) {
            if (err)
                return next(err);
            res.json(docs);
        });
    });
};

userSchema.activateUser = function (req, res, next) {
    schema.loginModel.findOne({user_id: req.query.userId}, function (err, userLoginData) {
        if (err)
            return res.json({error: "Unable to activate account"});
        if (userLoginData.emailId == req.query.email && userLoginData.activationCode == req.query.code) {
            if (userLoginData.isActive == true) {
                res.json({success: "Your acccount is already activated!"});
            } else {
                userLoginData.isActive = true;
                userLoginData.save(function (err, loginSaveData) {
                    if (err)
                        return next(err);
                    res.json({success: "Account activated successfully!"});
                });
            }
        } else {
            res.json({error: "Unable to activate account"});
        }
    });
};
module.exports = userSchema;


