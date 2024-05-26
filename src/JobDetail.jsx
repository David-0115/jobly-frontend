import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import JoblyApi from './api'
import Loader from './Loader'
import AppContext from "./AppContext";
import useCookies from "./useCookies";
import './JobDetail.css'

const JobDetail = ({ jobId }) => {
    const { user, updateUser, updateUserMessage } = useContext(AppContext)
    const [jobData, setJobData] = useState(null);
    const [apply, setApply] = useState(false)
    const [isApplied, setIsApplied] = useState(() => {
        return (user && user.applications ? user.applications.includes(Number(jobId)) : false)
    })
    const { syncCookie } = useCookies()

    const navigate = useNavigate();

    useEffect(() => {
        try {
            async function fetchData() {
                const res = await JoblyApi.request(`jobs/${jobId}`)
                    .then(res => setJobData(res.job));

            }
            setApply(false)
            fetchData();
        } catch (e) {
            updateUserMessage({ type: "error", message: e })
        }
    }, [jobId])

    useEffect(() => {
        try {
            if (apply) {
                async function updateApply() {
                    const res = await JoblyApi.request(`users/${user.username}/jobs/${jobId}`, {}, "post", user.token)
                        .then(res => res.applied ? updateUserMessage({ type: "success", message: `You applied for ${jobData.title}!` })
                            : updateUserMessage({ type: "error", message: `${res}` }))
                    setApply(false)
                    updateUser(() => ({
                        ...user,
                        applications: [...user.applications, jobId]
                    }))
                    syncCookie("user", user)
                    setIsApplied(true)
                }
                updateApply();
            }
        } catch (e) {
            updateUserMessage({ type: "error", message: e })
        }
    }, [apply])

    const applyForJob = () => {
        setApply(true)
    }

    user && user.applications ? user.applications.includes(Number(jobId)) : false


    if (jobData) {
        return (
            <div className="JobDetail">
                <h3 className="JobDetail-title">{jobData.title}</h3>
                <div className="JobDetail-finData">
                    <div className="finData-container">
                        <span className="JobDetail-data">Salary: {jobData.salary}</span>
                        <span className="JobDetail-data">Equity: {jobData.equity ? jobData.equity : 0}</span>
                    </div>
                </div>

                <div className="JobDetail-company-info">
                    <div className="JD-co">
                        <span className="JobDetail-data">Company: {jobData.company.name}</span>
                        <span className="JobDetail-data">Employees: {jobData.company.numEmployees ? jobData.company.numEmployees : "Not listed"}</span>
                    </div>
                    <div className="JD-rem">
                        <span className="JobDetail-desc">Company Description: </span>
                        <p className="JobDetail-data-description">{jobData.company.description}</p>
                        <span className="JobDetail-data-handle">Handle: {jobData.company.handle}</span>
                    </div>

                </div>
                {user ?
                    <div className="JobDetail-buttons-container">
                        <button className="JobDetail-btn JD-back" onClick={() => navigate(-1)}>Back</button>
                        {isApplied ? <> <button className="JobDetail-btn inactive">Apply</button>
                        </>
                            : <button className="JobDetail-btn JD-apply" onClick={applyForJob}>Apply</button>
                        }
                    </div>
                    : <span className="JD-login">Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to apply</span>
                }
                {isApplied ? <div className="JD-job-applied">
                    <p className="JobDetail-applied-notification">You have applied to this job.</p>
                </div> : ""}
            </div>
        )
    } else {
        return (
            <>
                <Loader />
            </>

        )
    }


}

export default JobDetail