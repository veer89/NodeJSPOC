var schema = require('../schema/exports.js');
var addressSchema = {};

addressSchema.checkUser = function(user_id, res){
    console.log(user_id+"userid");
    schema.addressModel.findById(user_id, function (err, docs) {
        if (err)
            return next(err);
        res(docs);
    });
};

addressSchema.add = function (req, res, next) {
	 addressSchema.checkUser(req.body.user_id, function(docs){
        if(docs && docs.empId){
    var address = new schema.addressModel({
            empId: req.body.empId,
            street: req.body.street,
            city: req.body.city,
            country: req.body.country,
            pin: req.body.pin,
            user_id:req.body.user_id,
    });
    address.save(function (err, doc) {
        if (err)
            return next(err);
        res.json(doc);
    });
    }
    else{
    	console.log("Sorry you cannot edit the address");
    }
});
};
addressSchema.query = function (req, res, next) {
	schema.addressModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
};
addressSchema.show = function (req, res, next) {
    schema.addressModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        res.json(docs);
    });
};
addressSchema.update = function (req, res, next) {
    schema.addressModel.findById(req.params.id, function (err, address) {
            address.empId = req.body.empId,
            address.street = req.body.street,
            address.city = req.body.city,
            address.country = req.body.country,
            address.pin = req.body.pin,
        address.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(doc);
        });
    });
};
addressSchema.delete = function (req, res, next) {
    schema.addressModel.findById(req.params.id, function (err, address) {
        address.remove(function (err, docs) {
            if (err)
                return next(err);
            res.json(docs);
        });
    });
}
module.exports = addressSchema;

