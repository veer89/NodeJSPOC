var schema = require('./schema/exports.js');
var filter = {
	keyFilter: function (req, res, next){
	    if(!req.query || !req.query.appKey)
	    	res.json(helper.genarateResponse(400, null, null, "Please Provide AppKey"));
	    else{
	        if(req.query.appKey == global._APPKEY)
	            next();
	        else
	        	res.json(helper.genarateResponse(400, null, null, "Invalid AppKey"));
	    }
	},
	userFilter: function(req, res, next){
		if(!req.query || !req.query.user_id)
			res.json(helper.genarateResponse(400, null, null, "user_id required"));
		schema.userModel.findById(req.query.user_id, function (err, docs) {
	        if (err)
	        	res.json(helper.genarateResponse(400, null, null, "Invalid user_id"));
	        next();
	    });
	}
}
module.exports = filter;