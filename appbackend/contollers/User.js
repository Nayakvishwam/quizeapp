const { models } = require("../db/dbConfig");
const { hashPassword, verifyPassword, createJwtToken, verifyJwt } = require("../utilities");

async function registerUser(req, res) {
    try {
        let userData = req.body;
        let exists = await models._users.exists({ email: userData.email });
        if (!exists) {
            userData.password = await hashPassword(userData.password);
            userData = new models._users(userData);
            userData.save();
            return res.status(200).send({ message: "Register successfully!",status_code:200 });
        }
        return res.status(409).send({ message: "This email id already registred!",status_code:409 });
    } catch (error) {
        res.status(500).send({ message: "Internal server error!",status_code:500 });
    }
};
async function login(req, res) {
    try {
        let userData = req.body;
        let exists = await models._users.exists({ email: userData.email });
        console.log(exists);
        if (exists) {
            let user = await models._users.findById(exists?._id);
            let allow = await verifyPassword(userData.password, user.password);
            if (allow) {
                user = {
                    id: user._id.toString(),
                    firstName: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    mobileno: user.mobileno,
                    dob: user.dob
                }
                let token = await createJwtToken(user);
                return res.status(200).send({ message: "Login successfully!", token: token,status_code:200 });
            }
        }
        res.status(409).send({ message: "Invalid email or password!",status_code:409 });
    } catch (error) {
        res.status(500).send({ message: "Internal server error!" ,status_code:500});
    }

}
async function getLoginUserData(req, res) {
    try {

        let { authorization } = req.headers;
        authorization = authorization?.split(' ')[1];
        let allow = await verifyJwt(authorization);
        if (allow) {
            let user = await models._users.findById(allow?.id);
            if (user) {
                user = {
                    id: user._id.toString(),
                    firstName: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    mobileno: user.mobileno,
                    dob: user.dob
                }
                return res.status(200).send({ message: "Login successfully!", data: user,status_code:200 });
            }
        }
        res.status(409).send({ message: "Details not found!",status_code:409 });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error!",status_code:500 });
    }
}
module.exports = {
    registerUser,
    login,
    getLoginUserData
}