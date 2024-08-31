import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { queziesDataAction } from "./redux/queziesSlice";
import { getDate } from "../../tools/tools";
import { Link } from "react-router-dom";

export default function QuizResults(): JSX.Element {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(queziesDataAction());
    }, []);
    const queziesDataDetails = useSelector(state => state.queziesReducer.response);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {queziesDataDetails?.map((data,index) => {
                    return (<tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{data?._id}</td>
                        <td>{getDate(data?.createdAt)}</td>
                        <td>{data?.total}</td>
                        <td>
                            <Link to={"/app/quizresults/" + data?._id}>
                                View
                            </Link>
                        </td>
                    </tr>)
                })
                }
            </tbody>
        </table>
    )
}