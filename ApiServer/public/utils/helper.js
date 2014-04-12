var crypto = require('crypto'),
    email = require('emailjs');
var helper = {
    //get activation code	
    getActivationCode: function (emailId) {
        var token = emailId + new Date().toString().split("").sort(function () {
            return Math.round(Math.random()) - 0.5;
        });
        return crypto.createHash('sha1').update(token).digest('hex')
    },
    getResetPassword: function(){
        return Math.random().toString(36).slice(-8);
    },
    //sends email 
    sendEmail: function (subject, recepient, body, sendAttachment , callback) {        
        var server = email.server.connect({
            user: "nodejspoc@gmail.com",
            password: "Global@123",
            host: "smtp.gmail.com",
            ssl: true
        });

        // define mail Body
        var mailBody = {            
            from: "NodeJsPoc <nodejspoc@gmail.com>",
            to: recepient,
            subject: subject           
        };

        if(sendAttachment){
            mailBody.attachment = [
                {data: "<html><body><div>Hi,</div><br><div>Please click below link to activate your account</div><br><div><a href=" + body + ">Activation Link</a></div><br><div>Regards,</div><br><div>NodeJsPoc</div></body></html>", alternative: true}
            ]
        }else{
            mailBody.text = body;
        }

        // send the message and get a callback with an error or details of the message that was sent
        server.send(mailBody, function (err, message) {
            callback();
        });
    },
    //generate hash and salt
    hash: function (pwd, salt, fn) {
        var len = 128;
        var iterations = 12000;
        if (3 == arguments.length) {
            crypto.pbkdf2(pwd, salt, iterations, len, fn);
        } else {
            fn = salt;
            crypto.randomBytes(len, function (err, salt) {
                if (err) return fn(err);
                salt = salt.toString('base64');
                crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
                    if (err) return fn(err);
                    fn(null, salt, hash);
                });
            });
        }
    },
    genarateResponse: function (statusCode, data, successMsg, error) {
        var response = {meta: {}};
        response.meta.status = statusCode;
        error ? (response.meta.message = error) : (successMsg ? (response.meta.message = successMsg) : (response.data = data))
        return response;
    }
}
module.exports = helper;