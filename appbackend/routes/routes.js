const { Quzies, QuizesData, submitQuize, QuizesQuestionsAnswers } = require("../contollers/quizes");
const { registerUser, login, getLoginUserData } = require("../contollers/User");
let express = require("express");
const { authorization } = require("../middleware/auth");
let router = express.Router();

router.post("/access/registeruser", express.json(), registerUser);
router.post("/access/login", express.json(), login);
router.get("/authenticator", authorization, getLoginUserData);
router.get("/quizes", authorization, Quzies);
router.get("/quizesdata", authorization, QuizesData);
router.post("/quizeadd", express.json(), authorization, submitQuize);
router.get("/quizanswer/:id", authorization, QuizesQuestionsAnswers);

module.exports = {
    router
}