const { registerUser, login, getLoginUserData } = require("../contollers/User");
let express = require("express");
let app = express();
let router = express.Router();

router.post("/registeruser", express.json(), registerUser);
router.post("/login", express.json(), login);
router.get("/authenticator", getLoginUserData);

module.exports = {
    router
}