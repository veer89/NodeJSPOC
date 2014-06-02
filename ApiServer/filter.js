var schema = require('./schema/exports.js'),
    helper = require('./public/utils/helper.js');
var filter = {
	keyFilter: function (req, res, next){
	    if(!req.query || !req.query.appKey)
	    	return res.json(helper.genarateResponse(400, null, null, "Please Provide AppKey"));
	    else{
	        if(req.query.appKey == global._APPKEY)
	            next();
	        else{
	        global._LOGGER.error('Invalid AppKey : ' + req.query.appKey);
	        return res.json(helper.genarateResponse(400, null, null, "Invalid AppKey"));
	        	
	        }
	    }
	},
	userFilter: function(req, res, next){
		if(!req.query || !req.query.user_id)
			return res.json(helper.genarateResponse(400, null, null, "user_id required"));
		schema.userModel.findById(req.query.user_id, function (err, docs) {
	        if (err || !docs){
	        	global._LOGGER.error('Invalid user_id : ' + req.query.user_id);
	        	return res.json(helper.genarateResponse(400, null, null, "Invalid user_id"));
	        }
	        next();
	    });
	},
	addressFilter: function(req, res, next){
		 // maximum two address allowed
        schema.addressModel.find({user_id: req.query.user_id}, function (err, docs) {
        	console.log(docs)
            if (err)
                return next(err);
            if (docs.length > 1)
            	return res.json(helper.genarateResponse(400, null, null, 'User can ony have two address'));
            next();
        });
		
	}
}
module.exports = filter;