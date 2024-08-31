import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthenticatorDetails, login, register } from "./loginApi";

const initialState = {
    response: null,
    loading: false,
    autherizationresponse: null
};

const actions = {
    login: "login/LOGIN",
    userDetails: "userDetails/USERDETAILS",
    register: "register/REGISTERDETAILS"
}

export const loginAction = createAsyncThunk(
    actions.login,
    async (payload) => {
        const response = await login(payload);
        return response;
    }
);

export const authenticatorDetails = createAsyncThunk(
    actions.userDetails,
    async (payload) => {
        const response = await getAuthenticatorDetails(payload);
        return response
    }
);


export const registerDetails = createAsyncThunk(
    actions.register,
    async (payload) => {
        const response = await register(payload);
        return response
    }
);

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.loading = true;
        }).addCase(loginAction.fulfilled, (state, action) => {
            state.loading = false;
            state.response = action.payload
        }).addCase(loginAction.rejected, (state, action) => {
            state.loading = true;
        });
        builder.addCase(authenticatorDetails.pending, (state) => {
            state.loading = true;
        }).addCase(authenticatorDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.autherizationresponse = action.payload;
        }).addCase(authenticatorDetails.rejected, (state, action) => {
            state.loading = true;
        });
    }
});
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;