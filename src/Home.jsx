import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import AppContext from "./AppContext";

const Home = () => {
    const navigate = useNavigate()
    const { user } = useContext(AppContext)

    useEffect(() => {
        if (user) {
            navigate("/jobs")
        }
    }, [user])

    return (
        <div className="Home-container">
            <h1 className="Home-text">Welcome to Jobly!</h1>
            <h3 className="Home-text">The path to your new career starts here!</h3>
            <p className="Home-text-p">
                <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to begin your journey.

            </p>
        </div>
    )
}

export default Home;