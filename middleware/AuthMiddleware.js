var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers.token;

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            res.status(401).json({ status: "unauthorized" });
        } else {
            let id = decoded.id;
            let email = decoded.email;
            req.headers.id = id;
            req.headers.email = email;

            // console.log(decoded);

            next();
        }
    });
};
