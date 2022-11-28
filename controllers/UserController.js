const UserModel = require("../models/UserModel");
const {
    userRegistrtionService,
    userLoginService,
    checkVerifyCodeService,
    ForgotPassService,
    ChangePassService,
    UserUpdateService,
} = require("../services/UserService");

exports.UserRegister = async (req, res) => {
    try {
        const user = await userRegistrtionService(req, UserModel);
        user.info?.email
            ? res.status(200).json(user)
            : res.status(500).json(user);
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};

exports.UserLogin = async (req, res) => {
    try {
        const login = await userLoginService(req, UserModel);

        if (login.status !== "fail") {
            res.status(200).json({
                status: "ok",
                msg: "Successfully Loged In",
                token: login,
            });
        } else {
            res.status(401).json({
                status: "fail",
                msg: login.msg,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed to Log in ",
            message: error.message,
        });
    }
};

exports.VerifyCode = async (req, res) => {
    try {
        const verify = await checkVerifyCodeService(req, UserModel);

        if (verify.status !== "fail") {
            res.status(200).json({
                status: "ok",
                msg: "Code Successfully Verified",
                info: verify,
            });
        } else {
            res.status(401).json({
                status: "fail",
                msg: verify.msg,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed to Log in ",
            message: error.message,
        });
    }
};

exports.ForgotPass = async (req, res) => {
    try {
        const forgot = await ForgotPassService(req, UserModel);

        if (forgot.status !== "fail") {
            res.status(200).json({
                status: "ok",
                msg: "Check Your Email and Verify Your Confirmation Code",
            });
        } else {
            res.status(401).json({
                status: "fail",
                msg: forgot.msg,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed to Forgot Password",
            message: error.message,
        });
    }
};

exports.ChangePassword = async (req, res) => {
    try {
        const forgot = await ChangePassService(req, UserModel);

        if (forgot.status !== "fail") {
            res.status(200).json({
                status: "ok",
                msg: "Password Successfully Updated",
            });
        } else {
            res.status(401).json({
                status: "fail",
                msg: forgot.msg,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Failed to Forgot Password",
            message: error.message,
        });
    }
};

exports.UpdateUser = async (req, res) => {
    try {
        const user = await UserUpdateService(req, UserModel);
        user.info?.email
            ? res.status(200).json(user)
            : res.status(500).json(user);
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};
