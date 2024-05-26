// takes list of jobs and renders a job for each one. 
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import AppContext from './AppContext';
import JoblyApi from "./api";
import Job from "./Job";
import Loader from "./Loader";
import Carousel from "./Carousel";
import Search from "./Search";
import './JobList.css'

const JobList = () => {
    const { jobs, filters, updateFilters, updateUserMessage } = useContext(AppContext)
    const [apiUrl, setApiUrl] = useState(null)
    const [jobList, setJobList] = useState([])
    const location = useLocation();
    const path = location.pathname.substring(1).split('/');


    useEffect(() => {
        updateFilters(null)
    }, [])

    useEffect(() => {
        if (jobs) {   //jobs are loaded from either user or company
            const jobComponents = jobs.map(job => (
                (<Job key={job.id} job={job} />)
            ))
            setJobList(jobComponents)
        } else {
            try {
                if (filters) {
                    if (filters.minSalary) {
                        filters.minSalary = filters.minSalary.replace(/[$,]/g, '')
                    }
                    const queryString = Object.entries(filters)
                        .filter(([key, val]) => val !== undefined && val !== null && val !== "")
                        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                        .join('&')
                    setApiUrl(`jobs?${queryString}`)
                } else {
                    setApiUrl('jobs')
                }

            } catch (e) {
                updateUserMessage({ type: "error", message: e })
            }
        }
    }, [jobs, filters])

    useEffect(() => {
        if (apiUrl) {
            try {
                async function fetchData() {
                    const res = await JoblyApi.request(apiUrl)
                    const jobComponents = res.jobs.map(job => (
                        (<Job key={job.id} job={job} />)
                    ))
                    setJobList(jobComponents)
                }
                fetchData();
            } catch (e) {
                updateUserMessage({ type: "error", message: e })
            }
        }
    }, [apiUrl])




    if (jobList) {
        return (
            <div className="JobList">
                <div>{path[0] === "companies" && path[1] ? "" : <Search />}

                </div>
                <Carousel components={jobList} />
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }

}



export default JobList;