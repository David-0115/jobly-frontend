import React, { useEffect, useState, useContext } from "react";
import JoblyApi from './api'
import Loader from './Loader'
import AppContext from "./AppContext";
import useCookies from "./useCookies";
import JobList from "./JobList"
import './CompanyDetail.css'



const CompanyDetail = ({ handle }) => {
    const { updateJobs, updateUserMessage } = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [coDetail, setCoDetail] = useState(null)

    useEffect(() => {
        try {
            async function fetchData() {
                const res = await JoblyApi.request(`companies/${handle}`)
                if (res.company.jobs) {
                    const updatedJobs = res.company.jobs.map((job) => ({
                        ...job,
                        companyHandle: res.company.handle,
                        companyName: res.company.name
                    }))

                    updateJobs(updatedJobs)
                    setCoDetail({
                        name: res.company.name,
                        description: res.company.description
                    })
                    setIsLoading(false)
                }
            }

            fetchData();
        } catch (e) {
            updateUserMessage({ type: "error", message: e })
        }
    }, [handle])

    if (isLoading) {
        return (
            <Loader />
        )
    } else {
        return (
            <div className="CompanyDetail">
                <h2 className="CompanyDetail-header">{coDetail.name}</h2>
                <span className="CompanyDetail-description">{coDetail.description}</span>
                <span className="CompanyDetail-header2">Available positions:</span>
                <JobList />
            </div>

        )
    }

}

export default CompanyDetail


// {
// 	"company": {
// 		"handle": "anderson-arias-morrow",
// 		"name": "Anderson, Arias and Morrow",
// 		"description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
// 		"numEmployees": 245,
// 		"logoUrl": "/logos/logo3.png",
// 		"jobs": [
// 			{
// 				"id": 7,
// 				"title": "Technical brewer",
// 				"salary": 157000,
// 				"equity": "0"
// 			},