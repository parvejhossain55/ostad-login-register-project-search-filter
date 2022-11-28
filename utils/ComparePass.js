const bcrypt = require('bcryptjs');

exports.ComparePass = (pass, hash) => {
    return bcrypt.compareSync(pass, hash)
}