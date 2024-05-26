import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppContext from "./AppContext";
import Home from "./Home";
import AuthForm from "./AuthForm";
import JobsList from "./JobList";
import JobDetail from "./JobDetail";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import UserProfile from "./UserProfile";



const JoblyRoutes = () => {
    const { user } = useContext(AppContext)
    const location = useLocation()
    const path = location.pathname.substring(1).split('/');

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthForm type="login" />} />
            <Route path="/register" element={<AuthForm type="register" />} />
            {user ? (
                <>
                    <Route path="/jobs/:jobId" element={<JobDetail jobId={path[1]} />} />
                    <Route path="/jobs" element={<JobsList />} />
                    <Route path="/companies/:handle" element={<CompanyDetail handle={path[1]} />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/:username/profile" element={<UserProfile />} />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/" />} />
            )}
        </Routes>
    );
};

export default JoblyRoutes;