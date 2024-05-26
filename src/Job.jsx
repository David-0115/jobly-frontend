// Render individual job
import React from "react";
import { Link } from "react-router-dom";
import "./Job.css"


const Job = ({ job }) => {
    return (
        <Link to={`/jobs/${job.id}`}>
            <div className="Job-container">
                <h4 className="Job-title">{job.title}</h4>
                <div>
                    <span className="Job-label">Company Name:</span>
                    <span className="Job-info">{job.companyName}</span>
                </div>
                <div>
                    <span className="Job-label">Salary:</span>
                    <span className="Job-info">{job.salary}</span>


                    <span className="Job-label">Equity:</span>
                    <span className="Job-info">{job.equity ? job.equity : 0}</span>
                </div>
                <div>
                    <span className="Job-label">Company Handle:</span>
                    <span className="Job-info">{job.companyHandle}</span>
                </div>
            </div>
        </Link>
    )
}

export default Job;