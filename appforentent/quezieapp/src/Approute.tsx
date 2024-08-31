import { Route, Routes } from "react-router";
import Quize from "./features/quezies/quezies";
import Home from "./features/quezies/quezieHome";
import Feedback from "./features/quezies/feedback";
import Results from "./features/quezies/results";
import QuizeResult from "./features/quezies/quizeresult";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/newquize" element={<Quize />} />
            <Route path="/home" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/results" element={<Results />} />
            <Route path="/quizresults/:id" element={<QuizeResult />} />
        </Routes>)
}