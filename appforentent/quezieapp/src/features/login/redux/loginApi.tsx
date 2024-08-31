import { apiCaller, apis } from "../../../utilities/utilities";

export const login = async (params) => {
    return await apiCaller.post({
        url: apis.Urls.login,
        body: {
            email: params.email,
            password: params.password
        }
    })
};
export const register = async (params) => {
    return await apiCaller.post({
        url: apis.Urls.register,
        body: params
    })
};

export const getAuthenticatorDetails = async (params) => {
    return await apiCaller.get({
        url: apis.Urls.authenticator,
        body: {}
    })
};