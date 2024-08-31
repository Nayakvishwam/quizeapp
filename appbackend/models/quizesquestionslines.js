const { Schema } = require("mongoose");

module.exports = function QuizesQuestionsLines(mongoose) {
    let quizesquestionsschema = new mongoose.Schema({
        userid: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        correct: {
            type: Boolean,
            required: true
        },
        quizeid: {
            type: Schema.Types.ObjectId,
            ref: 'quizelines',
            required: true
        },
        questionid: {
            type: Schema.Types.ObjectId,
            ref: 'questions',
            required: true
        }
    });
    let quizesquestions = mongoose.model('quizelinesquestions', quizesquestionsschema);
    return quizesquestions;
}