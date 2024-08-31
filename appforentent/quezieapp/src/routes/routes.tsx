import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from "react-router-dom"
import { history } from "../apps/history.js"
import Login from "../features/login/login.tsx";
import { AuthenticationCheck } from "../utilities/utilities.tsx";
import App from "../App.tsx";
import NewUser from "../features/login/register.tsx";


export default function Router() {
    return (
        <HistoryRouter history={history}>
            <Routes>
                <Route path="/app/login" element={<Login />} />
                <Route path="/app/register" element={<NewUser />} />
                <Route path="app/*" element={
                    <AuthenticationCheck>
                        <App />
                    </AuthenticationCheck>}
                >
                </Route>
            </Routes>
        </HistoryRouter>
    )
}