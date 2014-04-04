var schema = require('../schema/exports.js');
var fs = require('fs');
var util = require('util');
var imgPath = 'images/Koala.jpg';
var picSchema = {};

picSchema.add = function (req, res, next) {
	var pic = new schema.picModel({
        empId: req.body.empId,
        img: { data: fs.readFileSync(imgPath),
        	contentType: 'image/png'
        }
    });
    pic.save(function (err, doc) {
        if (err)
            return next(err);
        res.json("Pic Added Succussfully!!");

    });
}
picSchema.show = function (req, res, next) {
	schema.picModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        res.contentType(docs.img.contentType);
        res.send(docs.img.data);
    });
}
picSchema.update = function (req, res, next) {
	console.log(req.params.id)
	var imgUpdated = 'images/flower.jpg';
	schema.picModel.findById(req.params.id, function (err, userPic) {
            userPic.img.data = fs.readFileSync(imgUpdated),
        userPic.save(function (err, doc) {
            if (err)
                return next(err);
            res.json("Updated Pic !!");
        });
    });
}

picSchema.delete = function (req, res, next) {
	schema.picModel.findById(req.params.id).remove(function (err, docs) {
				if (err)
            return next(err);
			res.json("Deleted Pic !!");
		});
}	
module.exports = picSchema;