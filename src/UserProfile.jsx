import React, { useState, useContext, useEffect } from "react";
import AppContext from "./AppContext";
import UserUpdateForm from "./UserUpdateForm";
import JoblyApi from "./api";
import Loader from "./Loader";
import Job from "./Job";
import Carousel from "./Carousel";
import './UserProfile.css'

const UserProfile = () => {
    const { user, updateUserMessage } = useContext(AppContext);
    const [currentUser, setCurrentUser] = useState(user)
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isJobsVisible, setIsJobsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [appliedJobComponents, setAppliedJobComponents] = useState([])

    const updateFormVis = () => {
        if (isJobsVisible) setIsJobsVisible(false)
        setIsFormVisible(!isFormVisible)
    }

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    useEffect(() => {
        if (isJobsVisible) {
            try {
                const getJob = async (id) => await JoblyApi.request(`jobs/${id}`)
                const jobs = async () => {
                    const jobPromises = currentUser.applications.map((jobId) => getJob(jobId))
                    return await Promise.all(jobPromises)
                }
                jobs().then((jobs) => {
                    const jobComponents = jobs.map((arrIdx) => {
                        const job = {
                            id: arrIdx.job.id,
                            salary: arrIdx.job.salary,
                            equity: arrIdx.job.equity,
                            companyName: arrIdx.job.company.name,
                            companyHandle: arrIdx.job.company.handle,
                            title: arrIdx.job.title
                        }
                        return (<Job key={job.id} job={job} />)
                    })
                    console.log(jobComponents)
                    setAppliedJobComponents(jobComponents)
                    setIsLoading(false)
                })

            } catch (e) {
                updateUserMessage({ type: "error", message: e })
            }
        }
    }, [isJobsVisible])

    const updateJobsVis = () => {
        if (!isJobsVisible) setIsLoading(true)
        if (isFormVisible) setIsFormVisible(false)
        setIsJobsVisible(!isJobsVisible);
    }

    return (
        <div className="UserProfile-container">
            <div className="UserProfile">
                <h3 className="UserProfile-header">User Profile</h3>
                <div className="UserProfile-user-info">
                    <span className="UserProfile-info">Username: {currentUser.username}</span>
                    <span className="UserProfile-info">Name: {currentUser.firstName} {currentUser.lastName}</span>
                    <span className="UserProfile-info">Email: {currentUser.email} </span>
                </div>

                <div className="UserProfile-link-container">
                    {isFormVisible ? (
                        <span>
                            Update profile <i id="arrow1" className="fa-solid fa-angle-down display-arrow" onClick={updateFormVis}></i>
                        </span>
                    ) : (
                        <span>
                            Update profile <i id="arrow2" className="fa-solid fa-angle-right display-arrow" onClick={updateFormVis}></i>
                        </span>
                    )}

                    {isJobsVisible ? (
                        <>
                            <span>
                                My job applications <i id="arrow3" className="fa-solid fa-angle-down display-arrow" onClick={updateJobsVis}></i>
                            </span>
                        </>
                    ) : (
                        <span>
                            My job applications <i id="arrow4" className="fa-solid fa-angle-right display-arrow" onClick={updateJobsVis}></i>
                        </span>
                    )}
                </div>

                <div>
                    {isFormVisible ? <UserUpdateForm closeFn={updateFormVis} /> :
                        isLoading ? (<Loader />) : isJobsVisible ? <Carousel components={appliedJobComponents} /> : ""}
                </div>

            </div>
        </div>
    )
}

export default UserProfile

