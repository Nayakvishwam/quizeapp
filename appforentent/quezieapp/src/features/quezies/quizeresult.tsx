import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queziesAnswersAction } from "./redux/queziesSlice";
import { useParams } from "react-router";

export default function QuizeResult() {
    let { id } = useParams();
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(queziesAnswersAction({ id }))
    }, []);
    const quezies = useSelector(state => state.queziesReducer.response);
    let total=0;
    return (
        <>
            {quezies && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Question</th>
                            <th scope="col">Answer review</th>
                            <th scope="col">Correct answer</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            quezies?.map((data, index) => {
                                total+=data?.total;
                                return (< tr >
                                    <td>{index + 1}</td>
                                    <td>{data?.questionid?.question}</td>
                                    <td>{data?.correct ? "Yes" : "No"}</td>
                                    <td>{data?.questionid?.correctanswer}</td>
                                    <td>{data?.total}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table >)
            }
            <p style={{display:"flex",marginRight:12,justifyContent:"right"}}>Total:- {total}</p>
        </>
    )
}