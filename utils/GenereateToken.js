const jwt = require("jsonwebtoken");

exports.GenereateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "7d" });
};
