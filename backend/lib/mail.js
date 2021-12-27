const nodemailer = require('./nodemailer');
const {email, host, port, password} = require('../config.json');

var transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
        user: email, 
        pass: password,
    }
});

module.exports = function(params) {
    this.from = email;

    this.send = function () {
        var options = {
            from : this.from,
            to : params.to,
            subject : params.subject,
            text : params.message,
            html: params.html,
        };

        transporter.sendMail(options, function (err, suc){
            err ? params.errorCallback(err) : params.successCallback(suc);
        });
    }
}