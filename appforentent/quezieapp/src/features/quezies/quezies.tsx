import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { queziesAction, quizesDetailAction } from "./redux/queziesSlice";
import { Link } from "@mui/material";
import SnackbarComponent from "../../components/Snackbar";
import { useNavigate } from "react-router";

function Quize(): JSX.Element {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [totalquelize, setTotalQuelize] = useState(null);
    useEffect(() => {
        (async () => {
            let data = await dispatch(queziesAction());
            let quezies = data?.payload?.questions;
            setTotalQuelize(quezies?.reduce((data, preData, index) => {
                data[index] = {
                    id: preData.id,
                    correctAnswer: null
                };
                return data;
            }, {}));
        })();
    }, []);
    const alertinfo: Object = {
        message: "",
        type: "",
        show: false
    };
    const [alertData, setAlertData] = useState(alertinfo);
    const quezies = useSelector(state => state.queziesReducer.quezies);
    const [checkdboxoption, setCheckBoxOption] = useState<Object>({});
    const [questionNumber, setQuestionNumber] = useState<Number>(0);
    const handleOption = (event) => {
        let questiondata = { ...totalquelize[questionNumber] };
        questiondata.correctAnswer = event.target.value;
        (async () => {
            await setTotalQuelize((prevTotalQuelize) => ({
                ...prevTotalQuelize,
                ...{ [questionNumber]: questiondata }
            }));
            await setCheckBoxOption((prevTotalQuelize) => ({
                ...prevTotalQuelize,
                ...{ [questiondata.id]: questiondata?.correctAnswer }
            }));
        })();
    };
    const [time, setTime] = useState(0); // time in milliseconds
    const [isRunning, setIsRunning] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10); // Increment by 10ms
            }, 10);
            return
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const startStopHandler = () => {
        setIsRunning(!isRunning);
    };

    const resetHandler = () => {
        setIsRunning(false);
        setTime(0);
    };

    // Format time in mm:ss:ms format
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = (time % 1000) / 10;
        if (minutes == 5) {
            setIsRunning(false);
            setTime(0);
            if (questionNumber + 1 < 10) {
                setIsRunning(false);
                setQuestionNumber(true);
            }
        }
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    };
    let questiondata = quezies ? quezies[questionNumber] : [];
    return (
        <>
            {alertData?.show && (<SnackbarComponent {...alertData} />)}
            {
                quezies && totalquelize && (
                    <>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                            <span>
                                <p>
                                    {questionNumber + 1}/10
                                    {/* <Link className="btn" role="button" data-bs-toggle="button" onClick={() => handleQuestionNumber("reduce")}>{"<"}</Link> */}
                                    <Link className="btn" role="button" data-bs-toggle="button" onClick={() => setQuestionNumber(questionNumber < 9 ? questionNumber + 1 : questionNumber)}>{">"}</Link>
                                </p>
                            </span>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                {questiondata?.question}
                                <ul className="list-group list-group-flush mt-3">
                                    {questiondata?.options?.map((option: String, index) => {
                                        return <li className="list-group-item" key={option+index}><input type="radio" defaultChecked={checkdboxoption[questiondata.id] == option} value={option} id={questiondata.id} name="option" onClick={(event) => {
                                            handleOption(event)
                                        }}></input><span style={{ marginLeft: 30 }}>{option}</span></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        {questionNumber==9 && (<div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                            <button className="btn btn-primary me-md-2" type="button" onClick={async () => {
                                let data = Object.values(totalquelize);
                                let response = await dispatch(quizesDetailAction(data));
                                response = response?.payload;
                                if (response.status_code == 200) {
                                    setAlertData({
                                        message: response.message,
                                        type: "success",
                                        show: true
                                    });
                                    navigate("/app/feedback", { state: { data: response.data } })
                                } else {
                                    setAlertData({
                                        message: response.message,
                                        type: "error",
                                        show: true
                                    });
                                }
                            }}>Submit</button>
                        </div>)}
                        {formatTime(time)}
                    </>
                )
            }
        </>
    )
}
export default Quize;