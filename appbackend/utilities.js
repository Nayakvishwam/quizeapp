const os = require('os');
const bcrypt = require('bcrypt');
const path = require('path');
const { createNewFolder } = require('./tools');
const jwt = require("jsonwebtoken");

let secretkey = "OA/rVNvHMKXzMri/afBLjg==";
const getHomeDir = () => {
    return os.homedir();
};
const getDumyData = async (key) => {
    let data = await import("../appbackend/data/dumy.json", {
        assert: { type: 'json' }
    });
    data = data.default;
    if (data.hasOwnProperty(key)) {
        data = data[key];
    } else {
        data = false;
    }
    return data
}
// Function to hash a password
async function hashPassword(password) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

async function verifyPassword(plainPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
    }
}
let storageDirs = ["users"];
let storageDirName = "quizapp";
let dirPath = getHomeDir();
let getDirPath = path.join(dirPath, storageDirName)

async function buildEnv() {
    createNewFolder(getDirPath);
    for (let dirname of storageDirs) {
        let innerDirPath = path.join(getDirPath, dirname);
        createNewFolder(innerDirPath);
    }
}
async function createJwtToken(data) {
    const token = jwt.sign(data,
        secretkey, {
        expiresIn: '40d'
    });
    return token;
};

async function verifyJwt(token) {
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, secretkey);
        return decoded;
    } catch (err) {
        return false
    }
};

async function baseOfLoginUser(token) {
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, secretkey);
        return decoded?.id;
    } catch (err) {
        return false
    }
};

module.exports = {
    getHomeDir,
    getDumyData,
    hashPassword,
    verifyPassword,
    storageDirName,
    storageDirs,
    storageDirName,
    dirPath,
    getDirPath,
    buildEnv,
    port: 9000,
    createJwtToken,
    verifyJwt,
    baseOfLoginUser
};