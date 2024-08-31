const questions = require("./questions");
const users = require("./users");
const quizeslines = require("./quizeslines");
const quizesquestionslines = require("./quizesquestionslines");

function initModels(mongoose) {
    let _questions = questions(mongoose);
    let _users = users(mongoose);
    let _quizeslines = quizeslines(mongoose);
    let _quizesquestionslines = quizesquestionslines(mongoose);
    return {
        _questions,
        _users,
        _quizeslines,
        _quizesquestionslines
    }
}

module.exports = { initModels };