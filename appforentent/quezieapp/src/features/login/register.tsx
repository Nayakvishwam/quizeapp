import { useState } from "react";
import "../../assets/bootstrap.min.css"
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginAction, registerDetails } from "./redux/loginSlice";
import { setLocalStorage } from "../../tools/tools";
import SnackbarComponent from "../../components/Snackbar";
import { Link } from "react-router-dom";
import data from "../../data/indianstatescities.json";

export default function NewUser(): JSX.Element {
    const alertinfo: Object = {
        message: "",
        type: "",
        show: false
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alertData, setAlertData] = useState(alertinfo);
    const [userData, setUserData] = useState({
        firstname: null,
        lastname: null,
        mobileno: null,
        gender: null,
        state: null,
        dob: null,
        hobby: [],
        password: null,
        confirmpassword: null,
        email: null
    });
    let handleOnChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        if (!userData.hobby.includes(value) && event.target?.checked && event.target.name == "hobby") {
            userData.hobby.push(value);
            return;
        } else if (userData.hobby.includes(value) && !event.target?.checked && event.target.name == "hobby") {
            let index = userData.hobby.indexOf(value);
            userData.hobby.splice(index, 1);
            return;
        }
        setUserData((prevTotalQuelize) => ({
            ...prevTotalQuelize,
            ...{ [name]: value }
        }));
    };
    return (
        <>
            {alertData?.show && (<SnackbarComponent {...alertData} />)}
            <div className="container d-flex align-items-center justify-content-center">
                <div className="card shadow-sm" style={{ width: 400 }}>
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Register</h3>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">First name</label>
                                <input type="text" className="form-control" onChange={(event) => handleOnChange(event)} name="firstname" id="firstname" placeholder="Enter your username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">Last name</label>
                                <input type="text" className="form-control" onChange={(event) => handleOnChange(event)} name="lastname" id="lastname" placeholder="Enter your username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">Email</label>
                                <input type="email" className="form-control" onChange={(event) => handleOnChange(event)} name="email" id="email" placeholder="Enter your username" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobileno" className="form-label">Mobile no</label>
                                <input type="text" className="form-control" onChange={(event) => handleOnChange(event)} name="mobileno" id="mobileno" placeholder="Enter your mobileno" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender :-</label>
                                Male :- <input type="radio" onChange={(event) => handleOnChange(event)} className="form-check-input" name="gender" id="gender" value={"male"} />
                                Female :- <input type="radio" onChange={(event) => handleOnChange(event)} className="form-check-input" name="gender" id="gender" value={"female"} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" onChange={(event) => handleOnChange(event)} name="password" id="password" placeholder="Enter your password" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmpassword" className="form-label">Confirm password</label>
                                <input type="password" className="form-control" onChange={(event) => handleOnChange(event)} name="confirmpassword" id="confirmpassword" placeholder="Enter your confirm password" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" className="form-label">State</label>
                                <select className="form-select" onChange={(event) => handleOnChange(event)} name="state">
                                    {Object.keys(data).map((data, index) => {
                                        return <option key={index + 1} value={data}>{data}</option>
                                    })}
                                </select>
                                {userData.state && (<>
                                    <label htmlFor="city" className="form-label">City</label>
                                    <select className="form-select" onChange={(event) => handleOnChange(event)} name="city">
                                        {userData.state && (<option >---- Select city ----</option>)}
                                        {data.hasOwnProperty(userData.state) ? data[userData.state].map((data, index) => {
                                            return <option key={index} value={data}>{data}</option>
                                        }) : null}
                                    </select></>
                                )}
                                <div className="mt-3">
                                    <label htmlFor="confirmpassword" className="form-label">Hobby </label>
                                    <input type="checkbox" name="hoddy" onChange={(event) => handleOnChange(event)} id="hoddy" style={{ marginLeft: 4 }} value={"playcircket"} /> Play cricket
                                    <input type="checkbox" name="hoddy" onChange={(event) => handleOnChange(event)} id="hoddy" style={{ marginLeft: 4 }} value={"swimming"} /> :- Swimming
                                    <input type="checkbox" name="hoddy" onChange={(event) => handleOnChange(event)} id="hoddy" style={{ marginLeft: 4 }} value={"traveling"} /> :- Traveling
                                </div>
                                <label htmlFor="dob" className="form-label">Date of birth</label>
                                <input type="date" className="form-control" onChange={(event) => handleOnChange(event)} name="dob" id="dob" placeholder="Enter your date of birth" />
                            </div>
                            <button type="button" className="btn btn-primary w-100" onClick={async () => {
                                let data = Object.values(userData);
                                await setAlertData(alertinfo);
                                console.log(userData);
                                if (data?.includes("") || data?.includes(null)) {
                                    setAlertData({
                                        message: "Required all details",
                                        type: "error",
                                        show: true
                                    });
                                    return;
                                }
                                if (userData.password != userData.confirmpassword) {
                                    setAlertData({
                                        message: "Password and confirmpassword must be same",
                                        type: "error",
                                        show: true
                                    });
                                    return;
                                }
                                let userdata = await dispatch(registerDetails(userData));
                                userdata = userdata?.payload;
                                if (userdata.status_code == 200) {
                                    navigate("/app/login");
                                } else {
                                    setAlertData({
                                        message: userdata.message,
                                        type: "error",
                                        show: true
                                    });
                                    return;
                                };
                            }}>Create</button>
                        </form>
                        <div className="text-center mt-3">
                            <Link to={"/app/login"} className="small" style={{ textDecoration: "none" }}>Have account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}