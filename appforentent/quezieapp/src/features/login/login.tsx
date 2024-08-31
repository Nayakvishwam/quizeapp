import { useState } from "react";
import "../../assets/bootstrap.min.css"
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginAction } from "./redux/loginSlice";
import { setLocalStorage } from "../../tools/tools";
import SnackbarComponent from "../../components/Snackbar";
import { Link } from "react-router-dom";

export default function Login(): JSX.Element {
    const alertinfo: Object = {
        message: "",
        type: "",
        show: false
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alertData, setAlertData] = useState(alertinfo);
    let OnSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let loginData = Object.fromEntries(formData);
        setAlertData(alertinfo);
        if ((loginData) && !(Object.values(loginData).includes(null || ""))) {
            (async () => {
                const data = await dispatch(loginAction(loginData)).then((response) => {
                    return response.payload
                });
                if (data && data?.token) {
                    await setLocalStorage("token", data.token)
                    navigate("/app/home");
                } else {
                    setAlertData({
                        message: data.message,
                        type: "error",
                        show: true
                    })
                }
            })();
        }
    }
    return (
        <>
            {alertData?.show && (<SnackbarComponent {...alertData} />)}
            <div className="container d-flex align-items-center justify-content-center vh-100">
                <div className="card shadow-sm" style={{ width: 400 }}>
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Login</h3>
                        <form onSubmit={(event) => OnSubmit(event)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">User email</label>
                                <input type="text" className="form-control" name="email" id="email" placeholder="Enter your username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password" />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <Link to="/register" className="small" style={{ textDecoration: "none" }}>Donot have account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}