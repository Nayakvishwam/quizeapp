import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuezies, getQuizAnswer, Quizes, submitQuiz } from "./queziesApi";

const initialState = {
    response: null,
    loading: false,
    quezies: null
};

const actions = {
    queziesDetails: "queziesDetails/QUEIZIESDETAILS",
    addqueziesDetails: "quizDetailsAdd/QUIZDETAILSADD",
    queziesDataDetails: "queziesDataDetails/QUEIZIESDATADETAILS",
    queziesQuestionsDetails: "queziesQuestionsDetails/QUEIZIESQUESTIONSDETAILS"
}

export const queziesAction = createAsyncThunk(
    actions.queziesDetails,
    async () => {
        const response = await getQuezies();
        return response;
    }
);
export const queziesAnswersAction = createAsyncThunk(
    actions.queziesQuestionsDetails,
    async (params) => {
        const response = await getQuizAnswer(params);
        return response;
    }
);
export const queziesDataAction = createAsyncThunk(
    actions.queziesDataDetails,
    async () => {
        const response = await Quizes();
        return response;
    }
);
export const quizesDetailAction = createAsyncThunk(
    actions.addqueziesDetails,
    async (payload) => {
        const response = await submitQuiz(payload);
        return response;
    }
);
export const queziesSlice = createSlice({
    name: "quizes",
    initialState,
    reducers: {
        resetResponse:(state)=>{
            state.response=null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(queziesAction.pending, (state) => {
            state.loading = true;
        }).addCase(queziesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.quezies = action.payload?.questions;
        }).addCase(queziesAction.rejected, (state, action) => {
            state.loading = true;
        });
        builder.addCase(queziesDataAction.pending, (state) => {
            state.loading = true;
        }).addCase(queziesDataAction.fulfilled, (state, action) => {
            state.loading = false;
            state.response = action.payload?.data;
        }).addCase(queziesDataAction.rejected, (state, action) => {
            state.loading = true;
        });
        builder.addCase(quizesDetailAction.pending, (state) => {
            state.loading = true;
        }).addCase(quizesDetailAction.fulfilled, (state, action) => {
            state.loading = false;
            state.response = action.payload;
        }).addCase(quizesDetailAction.rejected, (state, action) => {
            state.loading = true;
        });
        builder.addCase(queziesAnswersAction.pending, (state) => {
            state.loading = true;
        }).addCase(queziesAnswersAction.fulfilled, (state, action) => {
            state.loading = false;
            state.response = action.payload?.data;
        }).addCase(queziesAnswersAction.rejected, (state, action) => {
            state.loading = true;
        });
    }
});
export const {resetResponse}=queziesSlice.actions;
export const queziesActions = queziesSlice.actions;
export default queziesSlice.reducer;