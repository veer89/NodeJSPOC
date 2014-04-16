var schema = require('../schema/exports.js'),
helper = require('../public/utils/helper.js');
var projectSchema = {};

projectSchema.addProject = function (req, res, next) {
	var projectName = req.body.projectName;
	var project = new schema.projectModel({
    	projectName: req.body.projectName,
    	projectLocation: req.body.projectLocation,
    	projectDuration: req.body.projectDuration
    });
    project.save(function (err, doc) {
        if (err)
            return next(err);
        if(doc)
        	res.json(helper.genarateResponse(200, doc, null, null));
        else
        	res.json(helper.genarateResponse(400, null, null, 'unable to create project'));
    });
}

projectSchema.addUserToProject = function (req, res, next) {
    var projId = req.body.projectId;
    var empId = req.query.user_id;
    schema.projectModel.findById(projId, function (err, projectData) {
		var empArr = projectData.user_id;
		if(empArr.indexOf(empId) == -1){
		    empArr.push(empId);
		}
		projectData.user_id = empArr;
		projectData.save(function (err, doc) {
        if (err)
            return next(err);
        if(doc)
        	res.json(helper.genarateResponse(200, doc, null, null));
        else
        	res.json(helper.genarateResponse(400, null, null, 'unable to add user to project'));
		});
    });
}

projectSchema.removeUserFromProject = function (req, res, next) {
    var projId = req.body.projectId;
    var empId = req.query.user_id;
    schema.projectModel.findById(projId, function (err, projectData) {
		var empArr = projectData.user_id;
		if(empArr.indexOf(empId) != -1){
			var pos = empArr.indexOf(empId);
			empArr.splice(pos,1);
		} else {
			res.json(helper.genarateResponse(400, null, null, 'user_id not present in project'));
		}
		projectData.user_id = empArr;
		projectData.save(function (err, doc) {
        if (err)
            return next(err);
        if(doc)
        	res.json(helper.genarateResponse(200, doc, null, null));
        else
        	res.json(helper.genarateResponse(400, null, null, 'unable to remove user for project'));
		});
    });
}

projectSchema.query = function (req, res, next) {
	schema.projectModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        if(docs)
        	res.json(helper.genarateResponse(200, docs, null, null));
        else
        	res.json(helper.genarateResponse(400, null, null, 'unable to query projects'));
        	
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
            if(doc)
            	res.json(helper.genarateResponse(200, doc, null, null));
            else
            	res.json(helper.genarateResponse(400, null, null, 'unable to update project'));
        });
    });
}

projectSchema.show = function (req, res, next) {
	schema.projectModel.findOne({projectName : req.params.projectName}, function (err, docs) {
        if (err)
            return next(err);
        if(!docs){
        	res.json(helper.genarateResponse(400, null, null, 'No Match Found for input criteria ' + req.params.projectName));
        } else {
        	res.json(helper.genarateResponse(200, docs, null, null));
        }
    });
}
projectSchema.delete = function (req, res, next) {
	schema.projectModel.findById(req.params.id, function (err, project) {
		project.remove(function (err, docs) {
            if (err)
                return next(err);
            if(docs)
            	res.json(helper.genarateResponse(200, docs, null, null));
            else
            	res.json(helper.genarateResponse(400, null, null, 'unable to delete project'));
        });
    });
}

module.exports = projectSchema;
