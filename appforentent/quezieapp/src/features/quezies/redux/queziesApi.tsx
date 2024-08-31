import { apiCaller, apis } from "../../../utilities/utilities";

export const getQuezies = async () => {
    return await apiCaller.get({
        url: apis.Urls.quezies
    })
};
export const getQuizAnswer = async (params) => {
    return await apiCaller.get({
        url: apis.Urls.quizesanswersdata+"/"+params.id
    })
};

export const submitQuiz = async (params) => {
    return await apiCaller.post({
        url: apis.Urls.addquizes,
        body: params
    })
};

export const Quizes = async () => {
    return await apiCaller.get({
        url: apis.Urls.quizesdata
    })
};