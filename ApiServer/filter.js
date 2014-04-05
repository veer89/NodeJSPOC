var schema = require('./schema/exports.js');
var filter = {
	keyFilter: function (req, res, next){
	    if(!req.query || !req.query.appKey)
	        res.json({error: "Please Provide AppKey"});
	    else{
	        if(req.query.appKey == global._APPKEY)
	            next();
	        else
	            res.json({error: "Invalid AppKey"});
	    }
	},
	userFilter: function(req, res, next){
		if(!req.query || !req.query.user_id)
			return res.json({error: "user_id required"});
		schema.userModel.findById(req.query.user_id, function (err, docs) {
	        if (err)
	        	return res.json({error: "Invalid user_id"});
	        next();
	    });
	},
	errorHandler: function (req, res, next){
		res.send({error: "enable to process request"})
	}

}
module.exports = filter;