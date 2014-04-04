var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js');

var loginSchema = {};
/*
function to authenticate users 
*/
loginSchema.authenticate = function(req, res, next){  
    schema.loginModel.findOne({emailId: req.params.emailId}, function(err, docs){
        if (err)
            return next(err);
        helper.hash(req.params.password, docs.salt, function(hashErr, hashVal){
        	if (hashErr) 
                return next(hashErr);
            if (hashVal.toString() == docs.hash) 
               return  docs.isActive ? res.json({success: 'login successfully'}) : res.json({success: 'Your account is not yet activated,please activate it!'})
           return res.json({failure: 'login failed!!! Enter Correct Username, Password'});
        });
    });    
};
/*
function to change passwords
*/
loginSchema.changePassword = function(req, res, next){   
   schema.loginModel.findById(req.params.id, function (loginErr, userData) {
	   if(loginErr)
			return res.json({errro: "Invalid Id"});
	   helper.hash(req.params.password, function(err, salt, hash){
            	userData.salt = salt;
            	userData.hash = hash;
        userData.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(doc);
        });
    });
   });
};

/*
function to logout user
*/
loginSchema.logout = function(req, res, next){   
    //TODO: add code here based on session token
};
module.exports = loginSchema;
