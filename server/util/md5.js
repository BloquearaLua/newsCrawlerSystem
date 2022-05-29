const crypto = require("crypto");
const {secret} = require("../config/config.default");

module.exports = (string) => {
    return crypto
            .createHash("md5")
            .update(secret+string)
            .digest("hex");
}