import React, { useContext, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import AppContext from './AppContext';
import JoblyApi from "./api";
import Loader from "./Loader";
import Carousel from "./Carousel";
import Search from "./Search";
import Company from "./Company";
import './CompanyList.css'
import { v4 as uuid } from 'uuid'

const CompanyList = () => {
    const { companies, updateUserMessage, filters, updateFilters } = useContext(AppContext)
    const [apiUrl, setApiUrl] = useState(null)
    const [companyList, setCompanyList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const path = location.pathname.substring(1).split('/');


    useEffect(() => {
        updateFilters(null)
    }, [path[0]])

    useEffect(() => {
        try {
            if (filters) {
                if (filters.minEmployees && filters.maxEmployees) {
                    if (Number(minEmployees) > Number(maxEmployees)) {
                        updateUserMessage({ type: "error", message: "Max employees needs to be greater than min employees. All companies displayed, please update search to filter results." })
                        setApiUrl("companies")
                    } else if (isNaN(Number(minEmployees)) || isNaN(!Number(maxEmployees))) {
                        updateUserMessage({ type: "error", message: "Min employees and max employees must be a whole number." })
                        setApiUrl("companies")
                    }
                } else {
                    const queryString = Object.entries(filters)
                        .filter(([key, val]) => val !== undefined && val !== null && val !== "")
                        .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
                        .join('&')
                    setApiUrl(`companies?${queryString}`)
                }
            } else {
                setApiUrl("companies")
            }
        } catch (e) {
            updateUserMessage({ type: "error", message: e })
        }

    }, [companies, filters])

    useEffect(() => {
        if (apiUrl) {
            async function fetchData() {
                try {
                    const res = await JoblyApi.request(apiUrl)
                    const updatedCompanies = res.companies.map((company) => ({ ...company, id: uuid() }))
                    const companyComponents = updatedCompanies.map(company => (
                        (<Company key={company.id} company={company} />)
                    ))
                    setCompanyList(companyComponents)
                    setIsLoading(false)
                } catch (e) {
                    updateUserMessage({ type: "error", message: e })
                }
            }
            fetchData();
        }
    }, [apiUrl])

    if (!isLoading) {
        return (
            <div className="CompanyList">
                <div>
                    <Search />
                </div>
                <Carousel components={companyList} />
            </div>
        )
    } else {
        return (
            <Loader />
        )
    }
}

export default CompanyList;

