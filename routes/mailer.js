"use strict";

//require the dotenv module
require("dotenv").config();

// require keys.js, where the secure tokens are pulled
var keys = require("../keys.js");

// require nodemailer
var nodemailer = require("nodemailer");

// object that wraps up the mailer functions
var mailer = {
    // function the sends email to the next person in the queue, the one next to make a choice. Takes in their email address and name.
    sendMessageToNext: async function (recipientEmail, recipientName) {
        // sets up the email
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: keys.username,
                pass: keys.password
            }
        });

        // function that builds the HTML version of the message, takes in the name of the recipient.
        var buildHTMLMessage = function (name) {
            var htmlMessage = "Dear " + name + ",";
            // html line breaks
            htmlMessage += "<br><br>";
            // body of the message
            htmlMessage += "It is your turn to schedule the cabin. To do so, visit this website: <a href='www.test.com'> www.test.com</a>.";
            // html line breaks
            htmlMessage += "<br><br>";
            // closing to the message
            htmlMessage += "Sincerely,";
            htmlMessage += "<br>";
            htmlMessage += "The Cabin";
            // returns the html text string
            return htmlMessage;
        };

        // function that builds the plaintext version of the message, takes in the name of the recipient
        var buildPlaintextMessage = function (name) {
            var textMessage = "Dear " + name + ",";
            // plain text line breaks
            textMessage += "\n\n";
            // body of the message
            textMessage += "It is your turn to schedule the cabin. To do so, visit this website: www.test.com .";
            // plain text line breaks
            textMessage += "\n\n";
            // closing to the message
            textMessage += "Sincerely,";
            textMessage += "\n";
            textMessage += "The Cabin";
            // returns the plain text string
            return textMessage;
        };

        // the object that gets passed to transporter.sendMail
        var message = {
            from: "fightingmongooses4@gmail.com",
            to: recipientEmail,
            subject: recipientName + ": It is your turn to schedule the cabin!",
            text: buildPlaintextMessage(recipientName),
            html: buildHTMLMessage(recipientName)
        };

        // sends the message
        var info = await transporter.sendMail(message);

        // testing functions that report if the mail sent
        console.log("Message sent: %s", info.messageId);
        // below console.log only works on ehtereal
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log(info.response);

        // below bracket closes the wrapper function
    },

    // function that sends email to the person who just selected their week at the cabin. Takes in their email address, name, begin date of reservation, end date of reservation.
    sendMessageToCurrent: async function (recipientEmail, recipientName, beginDate, endDate) {
        // sets up the email
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: keys.username,
                pass: keys.password
            }
        });

        // function that builds the HTML version of the message, takes in the name, begin date of reservation, and end date of reservation of the recipient.
        var buildHTMLMessage = function (name, beginDate, endDate) {
            var htmlMessage = "Dear " + name + ",";
            // html line breaks
            htmlMessage += "<br><br>";
            // body of the message
            htmlMessage += "You have scheduled the cabin for the following week: " + beginDate + " through " + endDate + ".";
            // html line breaks
            htmlMessage += "<br><br>";
            // closing to the message
            htmlMessage += "Sincerely,";
            htmlMessage += "<br>";
            htmlMessage += "The Cabin";
            // returns the html text string
            return htmlMessage;
        };

        // function that builds the plaintext version of the message, takes in the name of the recipient
        var buildPlaintextMessage = function (name, beginDate, endDate) {
            var textMessage = "Dear " + name + ",";
            // plain text line breaks
            textMessage += "\n\n";
            // body of the message
            textMessage += "You have scheduled the cabin for the following week: " + beginDate + " through " + endDate + ".";
            // plain text line breaks
            textMessage += "\n\n";
            // closing to the message
            textMessage += "Sincerely,";
            textMessage += "\n";
            textMessage += "The Cabin";
            // returns the plain text string
            return textMessage;
        };

        // the object that gets passed to transporter.sendMail
        var message = {
            from: "fightingmongooses4@gmail.com",
            to: recipientEmail,
            subject: recipientName + ": You've scheduled your week at the cabin!",
            text: buildPlaintextMessage(recipientName, beginDate, endDate),
            html: buildHTMLMessage(recipientName, beginDate, endDate)
        };

        // sends the message
        var info = await transporter.sendMail(message);

        // testing functions that report if the mail sent
        console.log("Message sent: %s", info.messageId);
        // below console.log only works on ethereal
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log(info.response);

        // below bracket closes the wrapper function
    }
};

// export the mailer object
module.exports = mailer;

// testing functions called

// mailer.sendMessageToCurrent("test@test.com", "Julie", "01/01/2019", "01/08/2019");
// mailer.sendMessageToNext("test@test.com", "Eric");

