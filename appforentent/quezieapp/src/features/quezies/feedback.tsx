import { useLocation } from "react-router"

export default function Feedback(): JSX.Element {
    let location=useLocation();
    location=location?.state?.data;
    return <h1>Successfully submit quiz :- Total :- {location?.total} id:- {location?.id} </h1>
};
