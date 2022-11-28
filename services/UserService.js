const bcrypt = require("bcryptjs");
const { ComparePass } = require("../utils/ComparePass");
const { GenereateToken } = require("../utils/GenereateToken");
const { RandomNumber } = require("../utils/RandomNumber");
const SendEmail = require("../utils/SendEmail");

exports.userRegistrtionService = async (req, model) => {
    try {
        const body = req.body;
        let data = await model.create(body);
        return { status: "ok", info: data };
    } catch (error) {
        return { status: "fail", error: error.toString() };
    }
};

exports.userLoginService = async (req, model) => {
    try {
        const { email, password } = req.body;

        let data = await model.aggregate([
            { $match: { email: email } },
            { $project: { email: 1, password: 1, role: 1 } },
        ]);

        // if invalid email
        if (!data[0].email) {
            return { status: "fail", msg: "Inavlid Email Address" };
        }

        // check user password
        let matchpass = ComparePass(password, data[0].password);

        if (!matchpass) {
            return { status: "fail", msg: "Inavlid Password" };
        } else {
            // genereat new token for user
            let token = GenereateToken({
                id: data[0]._id,
                email: data[0].email,
                role: data[0].role,
            });
            return token;
        }
    } catch (error) {
        return { status: "fail", error: error.toString() };
    }
};

exports.checkVerifyCodeService = async (req, model) => {
    try {
        const { email, confirmationCode: code } = req.body;
        const verify = await model.aggregate([
            { $match: { email: email, confirmationCode: code } },
            { $group: { _id: "$confirmationCode", total: { $sum: 1 } } },
        ]);

        if (verify[0].total) {
            return verify;
        }
    } catch (error) {
        return {
            status: "fail",
            msg: "Inavlid Email Address or Verifiction Code",
        };
    }
};

exports.ForgotPassService = async (req, model) => {
    try {
        const { email } = req.params;
        const forgot = await model.aggregate([
            { $match: { email: email } },
            { $group: { _id: "$email", total: { $sum: 1 } } },
        ]);

        if (!forgot[0].total) {
            return {
                status: "fail",
                msg: "Inavlid Email Address",
            };
        } else {
            let code = RandomNumber();
            let email = forgot[0]._id;
            let subject = "Forgot Password";
            let text = `Your verification code : ${code}`;

            const send = await SendEmail(email, subject, text);

            if (send.accepted.length) {
                await model.findOneAndUpdate(
                    { email: email },
                    { confirmationCode: code, codeStatus: 0 }
                );

                return { status: "ok", msg: "Email Send and Code Updated" };
            }
        }
    } catch (error) {
        return {
            status: "fail",
            msg: "Inavlid Email Address",
        };
    }
};

exports.ChangePassService = async (req, model) => {
    try {
        const { email, code, password } = req.body;
        const changepass = await model.aggregate([
            { $match: { email: email, confirmationCode: code } },
            { $group: { _id: "$email", total: { $sum: 1 } } },
        ]);

        if (!changepass[0].total) {
            return {
                status: "fail",
                msg: "Inavlid Verification Code or Password",
            };
        } else {
            await model.findOneAndUpdate(
                { email: email, confirmationCode: code },
                { password: bcrypt.hashSync(password) }
            );

            return { status: "ok", msg: "Password Successfully Updated" };
        }
    } catch (error) {
        return {
            status: "fail",
            msg: "Inavlid Verification Code or Password",
        };
    }
};

exports.UserUpdateService = async (req, model) => {
    try {
        const id = req.params.id;
        let data = await model.findOneAndUpdate({ _id: id }, req.body, {
            runValidators: true,
            new: true,
        });

        if (data) {
            return { status: "ok", msg: "Data Updated", info: data };
        }
    } catch (error) {
        return { status: "fail", error: error.toString() };
    }
};
