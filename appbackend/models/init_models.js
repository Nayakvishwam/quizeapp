const questions = require("./questions");
const users = require("./users");

function initModels(mongoose) {
    let _questions = questions(mongoose);
    let _users = users(mongoose);
    return {
        _questions,
        _users
    }
}

module.exports = { initModels };