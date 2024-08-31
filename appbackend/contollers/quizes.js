const { models } = require("../db/dbConfig");
const { baseOfLoginUser } = require("../utilities");

async function Quzies(req, res) {
    try {
        let questions = await models._questions.aggregate([
            { $sample: { size: 10 } }
        ]);
        if (questions) {
            questions = questions.reduce((data, perData) => {
                perData = {
                    question: perData.question,
                    options: perData.options,
                    id: perData._id
                };
                data?.push(perData);
                return data;
            }, []);
        };
        return res.status(200).send({ message: "Quezies successfully!", questions, status_code: 200 });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error!", status_code: 500 });
    }
};

async function submitQuize(req, res) {
    try {
        let payload = req.body;
        let { authorization } = req.headers;
        authorization = authorization?.split(' ')[1];
        let allow = await baseOfLoginUser(authorization);
        let questions = payload;
        let quizeline = {
            userid: allow
        }
        quizeline = await models._quizeslines.create(quizeline);
        let total = 0;
        if (questions) {
            for (let question of questions) {
                let data = await models._questions.findById({ _id: question.id });
                if (data) {
                    if (data.correctAnswer == question.correctAnswer) {

                    }
                    data.correctAnswer == question.correctAnswer ? total += 10 : false;
                    await models._quizesquestionslines.create({
                        userid: allow,
                        total: data.correctAnswer == question.correctAnswer ? 10 : 0,
                        correct: data.correctAnswer == question.correctAnswer ? 10 : 0,
                        quizeid: quizeline._id.toString(),
                        questionid: data?._id
                    });
                }
            }
            await models._quizeslines.findByIdAndUpdate(quizeline._id.toString(), { total: total });
        }
        return res.status(200).send({
            message: "Add Quezies successfully!", status_code: 200, data: {
                id: quizeline._id.toString(),
                total: total
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal server error!", status_code: 500 });
    }
}
async function QuizesData(req, res) {
    try {
        let { authorization } = req.headers;
        authorization = authorization?.split(' ')[1];
        let base = await baseOfLoginUser(authorization);
        let quizes = await models._quizeslines.find({ userid: base });
        return res.status(200).send({ message: "Get quzies successfully!", status_code: 200, data: quizes });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error!", status_code: 500 });
    }
}

async function QuizesQuestionsAnswers(req, res) {
    try {
        let { authorization } = req.headers;
        authorization = authorization?.split(' ')[1];
        let base = await baseOfLoginUser(authorization);
        let params = req.params;
        let data = await models._quizesquestionslines.find({ userid: base, quizeid: params.id }).populate('questionid', 'correctanswer question').exec();;
        console.log(data);
        return res.status(200).send({ message: "Get quzies successfully!", status_code: 200, data: data });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Internal server error!", status_code: 500 });
    }
}
module.exports = { Quzies, QuizesData, submitQuize, QuizesQuestionsAnswers };