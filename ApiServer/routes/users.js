var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js');

var userSchema = {};
userSchema.add = function (req, res, next) {
	console.log(req.body.password)
    if (!req.body.password)
        return res.json(helper.genarateResponse(400, null, null, 'Password Required'));
    console.log(req.body.password)
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
        res.json(helper.genarateResponse(200, docs, null, null));
    });
};
userSchema.query = function (req, res, next) {
    schema.userModel.find(req.query.where, function (err, docs) {
    	console.log(err,docs)
        if (err)
            return next(err);
        res.json(helper.genarateResponse(200, docs, null, null));
    });
};
userSchema.update = function (req, res, next) {
    schema.userModel.findById(req.params.id, function (err, userData) {
    	if(err)
    		return next(err); 
        userData.empId = req.body.empId,
            userData.first_name = req.body.first_name,
            userData.last_name = req.body.last_name,
            userData.phone_number = req.body.phone_number,
            userData.designation = req.body.designation,
            userData.salary = req.body.salary,
            userData.emailId = req.body.emailId,
            userData.profileId = req.body.profileId
        userData.save(function (saveErr, doc) {
            if (saveErr)
                return next(saveErr);
            res.json(helper.genarateResponse(200, doc, null, null));
        });
    });
};
userSchema.delete = function (req, res, next) {
    schema.userModel.findById(req.params.id, function (err, user) {
    	if(err)
    		return next(err);
        user.remove(function (err, docs) {
            if (err)
                return next(err);
            res.json(helper.genarateResponse(200, docs, null, null));
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


