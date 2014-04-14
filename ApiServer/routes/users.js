var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js'),
    async = require('async');

var userSchema = {};
userSchema.add = function (req, res, next) {
    if (!req.body.password)
        return res.json(helper.genarateResponse(400, null, null, 'Password Required'));
    var user = new schema.userModel({
        _id: uniqueId,
        empId: req.body.empId,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        designation: req.body.designation,
        experience: req.body.experience,
        emailId: req.body.emailId
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
                            helper.sendEmail("Activation Mail", loginData.emailId, activationLink, true, function () {
                                res.json(helper.genarateResponse(200, null, 'Activation link is sent to user email id ,Please click it to activate acccount!', null));
                            });

                        }
                        else
                            res.json(helper.genarateResponse(200, doc, null, null));
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
        if (docs)
            res.json(helper.genarateResponse(200, docs, null, null));
        else
            res.json(helper.genarateResponse(400, null, null, 'no object found'));
    });
};

userSchema.showDetails = function (req, res, next) {
    var responseObj = {};
    async.series([
        function (callback) {
            // get basic userInfo
            schema.userModel.findById(req.params.id, function (err, docs) {
                if (err)
                    return next(err);
                if (docs)
                    responseObj.user = docs;
                callback();
            });
        },
        function (callback) {
            // get All projects
            schema.projectModel.find({user_id: {$in: [req.params.id]}}, function (err, docs) {
                if (err)
                    return next(err);
                if (docs)
                    responseObj.projects = docs;
                callback();
            });
        },
        function (callback) {
            // get all address
            schema.addressModel.find({user_id: req.params.id}, function (err, docs) {
                if (err)
                    return next(err);
                if (docs)
                    responseObj.address = docs;
                callback();
            });
        },
        function (callback) {
            // get Photo object
            schema.pictureModel.find({user_id: req.params.id}, function (err, doc) {
                if (err)
                    return next(err);
                var customDoc = {};
                if (doc[0]) {
                    customDoc = {
                        _id: doc[0]._id ? doc[0]._id: "",
                        imgUrl: doc[0].img_url ? doc[0].img_url: "", 
                        name: doc[0].name ? doc[0].name : ""
                    };
                    responseObj.picture = customDoc;
                }
                callback();
            });
        },
        function (callback) {
            // get social object
            schema.socialModel.find(req.query.where, function (err, docs) {
                if (err)
                    return next(err);
                if (docs[0])
                    responseObj.social = docs[0];
                callback();
            });

        }], function (err, results) {
        if (err) return next(err);
        else
            res.json(helper.genarateResponse(200, responseObj, null, null));
    });
};

userSchema.query = function (req, res, next) {
    schema.userModel.find(req.query.where, function (err, docs) {
    	console.log(docs)
        if (err)
            return next(err);
        if (docs)
            res.json(helper.genarateResponse(200, docs, null, null));
        else
            res.json(helper.genarateResponse(400, null, null, 'no user found'));
    });
};
userSchema.update = function (req, res, next) {
    schema.userModel.findById(req.params.id, function (err, userData) {
        if (err)
            return next(err);
        userData.empId = req.body.empId,
            userData.first_name = req.body.first_name,
            userData.last_name = req.body.last_name,
            userData.phone_number = req.body.phone_number,
            userData.designation = req.body.designation,
            userData.salary = req.body.salary,
            userData.emailId = req.body.emailId,
            userData.experience = req.body.experience
        userData.save(function (saveErr, doc) {
            if (saveErr)
                return next(saveErr);
            if(doc)
            	res.json(helper.genarateResponse(200, doc, null, null));
            else
            	res.json(helper.genarateResponse(400, null, null, 'unable to update user'));
        });
    });
};
userSchema.delete = function (req, res, next) {
    schema.userModel.findById(req.params.id, function (err, user) {
        if (err)
            return next(err);
        user.remove(function (err, docs) {
            if (err)
                return next(err);
            if(docs)
            	res.json(helper.genarateResponse(200, docs, null, null));
            else
            	res.json(helper.genarateResponse(400, null, null, 'unable to delete user'));
        });
    });
};

userSchema.activateUser = function (req, res, next) {
    schema.loginModel.findOne({user_id: req.query.userId}, function (err, userLoginData) {
        if (err)
            return res.json(helper.genarateResponse(400, null, null, "Unable to activate account"));
        if (userLoginData.emailId == req.query.email && userLoginData.activationCode == req.query.code) {
            if (userLoginData.isActive == true) {
                return res.json(helper.genarateResponse(200, null, "Your acccount is already activated!", null));
            } else {
                userLoginData.isActive = true;
                userLoginData.save(function (err, loginSaveData) {
                    if (err)
                        return next(err);
                    return res.json(helper.genarateResponse(200, null, "Account activated successfully!", null));
                });
            }
        } else
            return res.json(helper.genarateResponse(200, null, null, "Unable to activate account"));
    });
};
module.exports = userSchema;


