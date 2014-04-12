var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js');

var loginSchema = {};

/*
Generate hash for a password
params{objectId}: User Id,
params{password}: password for which hash and salt to be generated
params{msg} : message to dispaly to the end user
params{res} : successcallback
params{next} : errorcallback 
*/
var generateHash = function(objectId, password, msg, res, next){
    schema.loginModel.findById(objectId, function (loginErr, userData) {
       if(loginErr)
           return res.json(helper.genarateResponse(400, null, null, "Invalid Id"));
       helper.hash(password, function(err, salt, hash){
                userData.salt = salt;
                userData.hash = hash;
                // save the generated hash and salt value into database
        userData.save(function (err, doc) {
            if (err)
                return next(err);
            return res.json(helper.genarateResponse(200, doc, msg, null));
        });
    });
   });
};

/*
function to authenticate users 
*/
loginSchema.authenticate = function(req, res, next){  
    schema.loginModel.findOne({emailId: req.body.emailId}, function(err, docs){
        if (err)
            return next(err);
        helper.hash(req.body.password, docs.salt, function(hashErr, hashVal){
        	if (hashErr) 
                return next(hashErr);
            if (hashVal.toString() == docs.hash) {               
               return  docs.isActive ? (res.json(helper.genarateResponse(200, docs, null, null))) : (res.json(helper.genarateResponse(400, null, "Your account is not yet activated,please activate it!", null)))
           }
           return res.json(helper.genarateResponse(400, null, null, "login failed, Enter Correct Username, Password"));	   
        });
    });    
};
/*
function to change passwords
*/
loginSchema.changePassword = function(req, res, next){  
    generateHash(req.params.id, req.body.password, null, res, next); 
};



/*
Function to reset password
*/

loginSchema.resetPassword = function(req, res, next){
    schema.loginModel.findOne({emailId: req.body.emailId}, function (loginErr, userData) {
        if(loginErr)
           return res.json(helper.genarateResponse(400, null, null, "Account does not exist"));
       else{
            var newPwd = helper.getResetPassword();
           helper.sendEmail("Reset Password", userData.emailId, newPwd, false , function () {
                // save password into logins table
                generateHash(userData.id, newPwd, 'Password is sent to user email id ,Please check it!',res, next);                
            });
       }
    });
};

/*
function to logout user
*/
loginSchema.logout = function(req, res, next){   
    //TODO: add code here based on session token
};
module.exports = loginSchema;
