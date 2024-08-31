import { useSelector } from "react-redux";
import { getDate } from "../../tools/tools";
import { useNavigate } from "react-router";

export default function Home(): JSX.Element {
    let autherizationresponse = useSelector(state => state.loginReducer.autherizationresponse);
    autherizationresponse = { ...autherizationresponse?.data };
    autherizationresponse.dob = getDate(autherizationresponse?.dob);
    const navigate = useNavigate();
    return (<>
        <h1>{autherizationresponse?.firstName + autherizationresponse?.lastname} Dob :- {autherizationresponse.dob}</h1>
        <button className="btn btn-primary me-md-2" onClick={() => {
            navigate("/app/newquize");
        }} type="button">Quize</button>
    </>)
}