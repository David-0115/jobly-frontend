import React, { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useCookies from "./useCookies";
import './Navbar.css';

const Navbar = () => {
    const { user, updateUser, userMessage, updateUserMessage } = useContext(AppContext);
    const location = useLocation();
    const [active, setActive] = useState()
    const { deleteCookie } = useCookies()
    const navigate = useNavigate()

    useEffect(() => {
        const path = location.pathname.substring(1).split("/")
        setActive(path[0])
    }, [location.pathname])

    const logout = async () => {
        const username = user.username
        updateUser(null)
        await deleteCookie("user")
        updateUserMessage({ type: "success", message: `${username} logged out.` })
        navigate("/")
    }

    return (
        <div className={userMessage ? "Navbar-down" : "Navbar"}>
            <h3 className="Navbar-logo"><Link to="/">Jobly</Link></h3>

            {user ? (
                <div className="Navbar-link-container">
                    <span className={active === "jobs" ? "Navbar-link-active" : "Navbar-link"}>
                        <Link to="/jobs">Jobs</Link>
                    </span>
                    <span className={active === "companies" ? "Navbar-link-active" : "Navbar-link"}>
                        <Link to="/companies">Companies</Link>
                    </span>
                    <span className={active === "profile" ? "Navbar-link-active" : "Navbar-link"}>
                        <Link to={`/${user.username}/profile`}>{user.username}</Link>
                    </span>
                    <span className="Navbar-link">
                        <Link onClick={logout}>Logout</Link>
                    </span>
                    {user.isAdmin ? (
                        <span className={active === "admin_dashboard" ? "Navbar-link-active" : "Navbar-link"}>
                            <Link to="/admin_dashboard">Admin Dashboard</Link>
                        </span>
                    ) : ""}
                </div>

            ) :
                <div className="Navbar-link-container">
                    <span className={active === "register" ? "Navbar-link-active" : "Navbar-link"}>
                        <Link to="/register">Register</Link>
                    </span>
                    <span className={active === "login" ? "Navbar-link-active" : "Navbar-link"}>
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            }

        </div>
    )
}

export default Navbar;