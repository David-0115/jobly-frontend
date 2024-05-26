import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";
import AppContext from "./AppContext";
import './AuthForm.css'
import Loader from "./Loader";
import useCookies from "./useCookies";

const AuthForm = ({ type }) => {
    const [isLoading, setIsLoading] = useState(true);
    let INITIAL_STATE;

    useEffect(() => {
        if (type === "login") {
            INITIAL_STATE =
            {
                username: "",
                password: ""
            }
        } else if (type === "register") {
            INITIAL_STATE =
            {
                username: "",
                password: "",
                firstName: "",
                lastName: "",
                email: ""
            }

        }
        setFormData(INITIAL_STATE)
        setIsLoading(false)
    }, [type])

    const [formData, setFormData] = useState(null)
    const { syncCookie } = useCookies()
    const { updateUser, updateUserMessage } = useContext(AppContext)
    const navigate = useNavigate();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const getReactUser = async (userToken) => {
        try {
            const userObj = await JoblyApi.request(`users/${formData.username}`, {}, "get", userToken)
            const { username, firstName, lastName, isAdmin, applications } = userObj.user
            const userData = {
                ...userObj.user,
                token: userToken,
            }
            return userData;
        } catch (e) {
            updateUserMessage({ type: "error", message: e })
        }
    }

    const handleSubmit = async evt => {
        evt.preventDefault();
        let auth;
        try {
            if (type === "register") {
                auth = await JoblyApi.request('auth/register', formData, "post")
            } else if (type === "login") {
                auth = await JoblyApi.request('auth/token', formData, "post");
            } else {
                console.error("AuthForm type invalid:", type)
            }
            const user = await getReactUser(auth.token);
            updateUser(user);
            syncCookie("user", user)

            if (type === "login") {
                updateUserMessage({ type: "success", message: `Welcome back to Jobly ${user.username}!` })
            } else if (type === "register") {
                updateUserMessage({ type: "success", message: `${user.username} account created.` })
            }

            setFormData({});
            navigate("/jobs")
        } catch (e) {
            updateUserMessage({ type: "error", message: e })
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    } else {
        return (

            <div className="AuthForm-container" id={type}>
                {type === "login" ?
                    <h1 className="AuthForm-header">Jobly login:</h1> :
                    <h1 className="AuthForm-header">Jobly registration:</h1>}
                <form className="AuthForm" onSubmit={handleSubmit}>
                    <div className="AuthForm-field">
                        <label htmlFor="username" className="AuthForm-label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="username"
                            className="AuthForm-input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="AuthForm-field">
                        <label htmlFor="password" className="AuthForm-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            className="AuthForm-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {type === "login" ?
                        <button id="AuthForm-login-btn">Login</button>
                        :
                        <>
                            <div className="AuthForm-field">
                                <label htmlFor="firstName" className="AuthForm-label">First name:</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="first name"
                                    className="AuthForm-input"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="AuthForm-field">
                                <label htmlFor="lastName" className="AuthForm-label">Last name:</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="last name"
                                    className="AuthForm-input"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="AuthForm-field">
                                <label htmlFor="email" className="AuthForm-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="email"
                                    className="AuthForm-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button id="AuthForm-register-btn">Register</button>
                        </>

                    }
                </form>
            </div>
        );
    }


}

export default AuthForm;
