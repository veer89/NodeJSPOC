var loginModel = require('../schema/login.js').loginModel;
var base64 = require('../public/libs/base64');
var base64Lib = new base64();
var loginSchema = {};
/*
function to add users into login table
For temporary purpose
*/

loginSchema.add = function (req, res, next) {
    var login = new loginModel({
        empId: req.body.empId,        
        emailId: req.body.emailId,
        password: base64Lib.encode(req.body.password),
        isActive: true
    });
    login.save(function (err, doc) {
        if (err)
            return next(err);
        res.json(doc);
    });
};

/*
function to see users from login table
For temporary purpose
*/
loginSchema.query = function (req, res, next) {
    loginModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
};


/*
function to authenticate users 
*/
loginSchema.authenticate = function(req, res, next){  
    loginModel.find({emailId: req.params.emailId, password: base64Lib.encode(req.params.password)}, function(err, docs){
        if (err)
            return next(err);
       
       // found record
        if(docs[0]){ 
           res.json({success: 'login successfully'});
        }else{
            res.json({failure: 'login failed!!! Enter Correct Username, Password'});
        }
         
    });    
};

/*
function to delete users from login table
*/
loginSchema.delete = function (req, res, next) {
    loginModel.findById(req.params.id, function (err, login) {
        login.remove(function (err, docs) {
            if (err)
                return next(err);
            res.json(docs);
        });
    });
};

/*
function to change passwords
*/
loginSchema.changePassword = function(req, res, next){   
   loginModel.findById(req.params.id, function (err, userData) {
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
