var index = {};
index.getIndex = function(req, res, next){   
	res.render('index', { title: 'Express' });
};
module.exports = index;