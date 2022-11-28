const nodemailer = require("nodemailer");

const SendEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            // user: "phthrp.hr.s.xn.sri@gmail.com",
            // pass: "vY6sFTMywLzOc0DK",
            user: "dorisrivera.30.26.0.222@gmail.com",
            pass: "BwKspVZmfEj0Xd1O",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from: "Inventory Management <noreply@parvejhossain.com>",
        to: to,
        subject: subject,
        text: text,
        // html: html,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = SendEmail;
