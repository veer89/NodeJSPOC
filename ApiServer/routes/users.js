var schema = require('../schema/exports.js'),
    crypto = require('crypto'),
    email = require('emailjs'),
    base64 = require('../public/libs/base64'),
    base64Lib = new base64();

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
            var login = new schema.loginModel({
                emailId: doc.emailId,
                password: base64Lib.encode(req.body.password),
                isActive: req.params.activate == "true" ? false : true,
                user_id: doc._id,
                activationCode: getActivationCode(doc.emailId)
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
                        sendEmail(loginData.emailId, activationLink, function () {
                            res.json({success: 'Activation link is sent to user email id ,Please click it to activate acccount!'});
                        });
                    }
                    else
                       res.json(doc);
                }
            });
        }
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

userSchema.activateUser = function (req, res, next) {
    schema.loginModel.findOne({user_id: req.query.userId}, function (err, userLoginData) {
        if (err)
            return res.json({error: "Unable to activate account"});
        if (userLoginData.emailId == req.query.email && userLoginData.activationCode == req.query.code) {
        	if(userLoginData.isActive == true){
        		res.json({success: "Your acccount is already activated!"});
        	}else{
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
}
//genearate activation code based on email id
function getActivationCode(emailId) {
    var token = emailId + new Date().toString().split("").sort(function () {
        return Math.round(Math.random()) - 0.5;
    });
    return crypto.createHash('sha1').update(token).digest('hex')
}
//sends email 
function sendEmail(recepient, body, callback) {
    var server = email.server.connect({
        user: "nodejspoc@gmail.com",
        password: "Global@123",
        host: "smtp.gmail.com",
        ssl: true
    });
    // send the message and get a callback with an error or details of the message that was sent
    server.send({
        from: "NodeJsPoc <nodejspoc@gmail.com>",
        to: recepient,
        subject: "Activation Mail",
        attachment: 
        	   [
        	      {data:"<html><body><div>Hi,</div><br><div>Please click below link to activate your account</div><br><div>" + body + "</div><br><div>Regards,</div><br><div>NodeJsPoc</div></body></html>", alternative:true}
        	   ]
    }, function (err, message) {
        callback();
    });
};
module.exports = userSchema;


