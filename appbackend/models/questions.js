module.exports = function Questions(mongoose) {
    let questionsSchema = new mongoose.Schema({
        type: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        correctanswer: {
            type: String,
            required: true
        }
    });
    let questions = mongoose.model('questions', questionsSchema);
    return questions;
}