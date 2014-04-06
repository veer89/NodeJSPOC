var schema = require('../schema/exports.js'),
    helper = require('../public/utils/helper.js');
var addressSchema = {};

addressSchema.add = function (req, res, next) {
    var address = new schema.addressModel({
            street: req.body.street,
            city: req.body.city,
            country: req.body.country,
            pin: req.body.pin,
            user_id: req.query.user_id,
    });
    address.save(function (err, doc) {
        if (err)
            return next(err);
        res.json(helper.genarateResponse(200, doc, null, null));
    });
};
addressSchema.query = function (req, res, next) {
	schema.addressModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        res.json(helper.genarateResponse(200, docs, null, null));
    });
};
addressSchema.show = function (req, res, next) {
    schema.addressModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        res.json(helper.genarateResponse(200, docs, null, null));
    });
};
addressSchema.update = function (req, res, next) {
    schema.addressModel.findById(req.params.id, function (addressErr, address) {
    	if (addressErr)
            return next(addressErr);
            address.street = req.body.street,
            address.city = req.body.city,
            address.country = req.body.country,
            address.pin = req.body.pin,
        address.save(function (err, doc) {
            if (err)
                return next(err);
            res.json(helper.genarateResponse(200, doc, null, null));
        });
    });
};
addressSchema.delete = function (req, res, next) {
    schema.addressModel.findById(req.params.id, function (addressErr, address) {
    	if (addressErr)
            return next(addressErr);
        address.remove(function (err, docs) {
            if (err)
                return next(err);
            res.json(helper.genarateResponse(200, docs, null, null));
        });
    });
}
module.exports = addressSchema;

