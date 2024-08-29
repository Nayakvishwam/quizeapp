const models = require("./dbConfig");
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
                    question.correctanswer=question.correct_answer;
                    delete question.correct_answer;
                    questions.push(question)
                }
            }
            await models._questions.insertMany(questions);
        }
    } catch (err) {
        console.error('Error counting documents:', err);
    }
}