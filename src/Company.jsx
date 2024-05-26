import React from "react";
import { Link } from "react-router-dom";
import "./Company.css"

const Company = ({ company }) => {
    return (
        <Link to={`/companies/${company.handle}`}>
            <div className="Company-container">
                <h4 className="Company-title">{company.name}</h4>
                <div>
                    <span className="Company-employees">Employees: {company.numEmployees}</span>
                    <span className="Company-handle">Handle: {company.handle}</span>
                </div>
                <div>
                    <span className="Company-description">Description:</span>
                    <span className="Company-description">{company.description}</span>
                </div>

            </div>
        </Link>
    )
}

export default Company;







/* {
    "handle": "anderson-arias-morrow",
    "name": "Anderson, Arias and Morrow",
    "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
    "numEmployees": 245,
    "logoUrl": "/logos/logo3.png"
} */