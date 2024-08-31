const { models } = require("../db/dbConfig");
const { verifyJwt } = require("../utilities");

async function authorization(req, res, next) {
    let { authorization } = req.headers;
    authorization = authorization?.split(' ')[1];
    let allow = await verifyJwt(authorization);
    if (allow) {
        let user = await models._users.findById(allow?.id);
        if (user) {
            next();
            return;
        }
    }
    res.status(409).send({ message: "Unathourized!" });
}
module.exports = { authorization }