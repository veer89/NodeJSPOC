var schema = require('../schema/exports.js');
var base64 = require('../public/libs/base64');
var base64Lib = new base64();
var loginSchema = {};


/*
function to authenticate users 
*/
loginSchema.authenticate = function(req, res, next){  
    schema.loginModel.find({emailId: req.params.emailId, password: base64Lib.encode(req.params.password)}, function(err, docs){
        if (err)
            return next(err);
       // found record
        if(docs[0])
        	docs[0].isActive ? res.json({success: 'login successfully'}) : res.json({success: 'Your account is not yet activated,please activate it!'}) 
        else
            res.json({failure: 'login failed!!! Enter Correct Username, Password'});
    });    
};


/*
function to change passwords
*/
loginSchema.changePassword = function(req, res, next){   
   schema.loginModel.findById(req.params.id, function (err, userData) {
            userData.password = base64Lib.encode(req.params.password),            
        userData.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(doc);
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
