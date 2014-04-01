var schema = require('../schema/exports.js');
var projectSchema = {};

projectSchema.add = function (req, res, next) {
	schema.userModel.findById(req.params.id, function (err, userData) {
    	if(err){
    		return next(err);
    	} else {
    		var empId = userData.empId;
    	    var project = new schema.projectModel({
    	    	projectName: req.body.projectName,
    	    	projectLocation: req.body.projectLocation,
    	    	projectDuration: req.body.projectDuration,
    	    	empId: empId
    	    });
    	    project.save(function (err, doc) {
    	        if (err)
    	            return next(err);
    	        res.json(doc);
    	    });

    	}
    });
}

projectSchema.query = function (req, res, next) {
	schema.projectModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
}

projectSchema.update = function (req, res, next) {
	schema.projectModel.findById(req.params.id, function (err, projectData) {
    		projectData.projectName = req.body.projectName,
    		projectData.projectLocation = req.body.projectLocation,
    		projectData.projectDuration = req.body.projectDuration
    		projectData.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(doc);
        });
    });
}

module.exports = projectSchema;