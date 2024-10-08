const { Schema } = require("mongoose");

module.exports = function QuizesLines(mongoose) {
    let quizesschema = new mongoose.Schema({
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
            type: Number
        }
    });
    let quizes = mongoose.model('quizelines', quizesschema);
    return quizes;
}