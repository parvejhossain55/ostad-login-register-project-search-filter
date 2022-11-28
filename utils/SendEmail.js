const nodemailer = require("nodemailer");

const SendEmail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
            user: "thongmark.vu.n.gvo.ng@gmail.com",
            pass: "vPZdbmKA4Fh9C2n1",
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
