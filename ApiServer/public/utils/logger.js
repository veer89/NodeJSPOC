var log4js = require('log4js'); 

log4js.configure({
	  appenders: [
	    { 
	    	type: 'console' 
	    },
	    { 
	    	type: 'file', 
	    	filename: 'serverLogs.log', 
	    	category: 'server' 
	    }
	  ]
	});

var logger = log4js.getLogger('server');
module.exports = logger;

