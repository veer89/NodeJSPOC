var schema = require('../schema/exports.js');
var fs = require('fs');
var util = require('util');
var imgPath = 'images/Koala.jpg';
var picSchema = {};
picSchema.add = function (req, res, next) {
    
    
	var pic = new schema.picModel({
        empId: req.body.empId,
        img: { data: fs.readFileSync(imgPath),
        //	img: { data: req.body.image1,
        	contentType: 'image/png'
        }
    });
    

    pic.save(function (err, doc) {
        if (err)
            return next(err);
        //res.json(doc);
        	res.contentType(doc.img.contentType);
        	res.send(doc.img.data);
        //res.writeHead(200, {'Content-Type': 'image/gif' });
        //res.end(img, 'binary');
    });
    

    res.json("Hey !!");
    console.log(req.body.empId);
    console.log(req.body.first_name);

    //console.log(util.inspect(res, { showHidden: false, depth: null }));
}

picSchema.show = function (req, res, next) {
	console.log(req.params.id)

	schema.picModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        res.contentType(docs.img.contentType);
        res.send(docs.img.data);
    });
	
}

picSchema.delete = function (req, res, next) {
	console.log(req.params.id)

	schema.picModel.findById(req.params.id).remove(function (err, docs) {
				if (err)
            return next(err);
			res.json("Deleted Pic !!");
			res.status('200');
		});
}	


module.exports = picSchema;