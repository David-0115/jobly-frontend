import React, { useContext } from "react";
import AppContext from "./AppContext";
import './Alert.css';

const Alert = () => {
    const { userMessage, updateUserMessage } = useContext(AppContext)

    const clearMessage = () => {
        updateUserMessage(null)
    }
    return (
        <div className={`Alert-${userMessage.type}`}>
            <span className="Alert-message">{userMessage.message}</span>
            <span className="Alert-btn"><i className="fa-solid fa-xmark" onClick={clearMessage}></i></span>
        </div>
    )
}

export default Alert;