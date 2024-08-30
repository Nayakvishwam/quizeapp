const { models } = require("./dbConfig");
const path = require('path');
const fs = require('fs');
const { getDumyData, hashPassword, getDirPath } = require("../utilities");
const { uploadFiles } = require("../middleware/upalodFiles");

module.exports = async function syncRecords() {
    try {
        const totalQuestions = await models._questions.countDocuments();
        if (totalQuestions == 0) {
            let data = await import("../data/data.json", {
                assert: { type: 'json' }
            });
            data = data.default;
            let questions = [];
            for (let question of data) {
                if (question.type == "multiple") {
                    question = { ...question };
                    question.options = question.incorrect_answers;
                    delete question.incorrect_answers;
                    question.options.push(question.correct_answer);
                    question.correctanswer = question.correct_answer;
                    delete question.correct_answer;
                    questions.push(question)
                }
            }
            await models._questions.insertMany(questions);
        }
        let totalUsers = await models._users.countDocuments();
        if (totalUsers == 0) {
            // Read the PNG file in binary form
            let user = await getDumyData("users");
            if (user) {
                user.password = await hashPassword(user.password);
                user = new models._users(user);
                user = await user.save();
                let pngFilePath = process.cwd();
                pngFilePath = path.join(pngFilePath, "data", "User.png");
                fs.readFile(pngFilePath, (err, data) => {
                    if (err) throw err;
                    pngFilePath = path.join(getDirPath, "users", user?._id?.toString());
                    uploadFiles(pngFilePath, data);
                });
            }
        }
    } catch (err) {
        console.error('Error counting documents:', err);
    }
}