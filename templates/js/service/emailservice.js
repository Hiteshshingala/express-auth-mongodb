"use strict";
const nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD
        }
    });


module.exports = {
    verifymail: function (req, request, res) {

        var mailOptions, link;
        link = `${request.protocol}://${request.headers.host}/api/v1/users/verify?id=${req.id}`;
        mailOptions = {
            to: req.email,
            subject: "Please confirm your Email account",
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                res.end("sent");
            }
        });
    },
    forgotpasswordmail: function (req, host, res) {
        var mailOptions, link;
        link = `${host}/api/v1/users/fogotpassword?Verifytoken=${req.Verifytoken}`
        mailOptions = {
            to: req.email,
            subject: "Please Reset Your Password Using Bottom Link",
            html: "Hello,<br> Please Click on the link to Reset Your Password.<br><a href=" + link + ">Click here to reset password</a>"
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                res.end("error");
            } else {
                res.end("sent");
            }
        });
    }
}
