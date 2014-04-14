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
        if(doc)
        	res.json(helper.genarateResponse(200, doc, null, null));
        else
            res.json(helper.genarateResponse(400, null, null, 'unable to create address'));
    });
};
addressSchema.query = function (req, res, next) {
	schema.addressModel.find(req.query.where, function (err, docs) {
        if (err)
            return next(err);
        if(docs)
        	res.json(helper.genarateResponse(200, docs, null, null));
        else
            res.json(helper.genarateResponse(400, null, null, 'unable to query address'));
    });
};
addressSchema.show = function (req, res, next) {
    schema.addressModel.findById(req.params.id, function (err, docs) {
        if (err)
            return next(err);
        if(docs)
        	res.json(helper.genarateResponse(200, docs, null, null));
        else
            res.json(helper.genarateResponse(400, null, null, 'unable to show address'));
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
            if(doc)
            	res.json(helper.genarateResponse(200, doc, null, null));
            else
                res.json(helper.genarateResponse(400, null, null, 'unable to update address'));
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
            if(docs)
            	res.json(helper.genarateResponse(200, docs, null, null));
            else
                res.json(helper.genarateResponse(400, null, null, 'unable to delete address'));
        });
    });
}
module.exports = addressSchema;

