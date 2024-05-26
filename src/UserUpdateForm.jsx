import React, { useState, useContext } from "react";
import AppContext from "./AppContext";
import JoblyApi from "./api";
import useCookies from "./useCookies";
import "./UserUpdateForm.css"

const UserUpdateForm = ({ closeFn }) => {
    const { user, updateUser, updateUserMessage } = useContext(AppContext);
    const { syncCookie } = useCookies()
    const INITIAL_STATE = {
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
    }

    const getReactUser = async (userToken) => {
        try {
            const userObj = await JoblyApi.request(`users/${user.username}`, {}, "get", userToken)
            const { username, firstName, lastName, email, isAdmin, applications } = userObj.user
            const userData = {
                ...userObj.user,
                token: userToken,
            }
            return userData;
        } catch (e) {
            updateUserMessage({ type: "error", message: e })
        }
    }

    const updateUserInfo = async (userData) => {
        try {
            await JoblyApi.request(`users/${user.username}`, userData, "patch", user.token);
            const updatedUser = await getReactUser(user.token);
            console.log(updatedUser);
            updateUser(updatedUser);
            syncCookie("user", updatedUser);
        } catch (e) {
            updateUserMessage({ type: "error", message: e.message || e });
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const newUserData = {};
            for (const [key, value] of Object.entries(formData)) {
                if (value !== "" && value !== user[key]) {
                    newUserData[key] = value;
                }
            }
            if (Object.entries(newUserData).length !== 0) {
                await updateUserInfo(newUserData);
                setFormData(INITIAL_STATE);
                updateUserMessage({ type: "success", message: `${user.username} profile updated.` });
            } else {
                updateUserMessage({ type: "error", message: `Update profile form was either blank or ${user.username}'s profile currently matches changes requested` });
            }
        } catch (e) {
            updateUserMessage({ type: "error", message: e.message || e });
        }
    };

    return (
        <div className="UserUpdateForm-container">
            <form className="UserUpdateForm" onSubmit={handleSubmit}>
                <div className="UserUpdateForm-input-div">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="UserUpdateForm-input-div">
                    <label htmlFor="firstName">First name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="UserUpdateForm-input-div">
                    <label htmlFor="lastName">Last name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="UserUpdateForm-input-div">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="UserUpdateForm-btn-container">
                    <button className="UserUpdateForm-btn-cancel" onClick={closeFn}>Close</button>
                    <button className="UpdateUserForm-btn-update">Update</button>
                </div>
            </form>
        </div>
    )
}

export default UserUpdateForm

