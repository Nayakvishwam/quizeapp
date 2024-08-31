import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import { history } from "../apps/history";

export default function Navabar(): JSX.Element {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/app/home">Quizes app</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={"/app/newquize"} style={{ textDecoration: "none" }} className="nav-link active">New quiz</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/app/results"} style={{ textDecoration: "none" }}>Results</NavLink>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => {
                                localStorage.clear();
                                history.push('/app/login');
                            }} style={{ textDecoration: "none" }}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}