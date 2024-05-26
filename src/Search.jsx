import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom"
import './Search.css';
import AppContext from "./AppContext";
import Loader from "./Loader";

const Search = () => {
    const { filters, updateFilters } = useContext(AppContext)
    const location = useLocation();
    const path = location.pathname.substring(1).split('/');

    const [formData, setFormData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let INITIAL_STATE;
    useEffect(() => {
        if (path[0] === "jobs") {
            INITIAL_STATE =
            {
                title: "",
                minSalary: "",
                hasEquity: ""
            }
        } else if (path[0] === "companies") {
            INITIAL_STATE =
            {
                minEmployees: "",
                maxEmployees: "",
                name: ""
            }

        }
        setFormData(INITIAL_STATE)
        setIsLoading(false)
    }, [location, filters])

    const title = path[0][0].toUpperCase() + path[0].slice(1);


    const handleChange = evt => {
        const { name, value, type, checked } = evt.target;
        const finalValue = type === 'checkbox' ? checked : value
        setFormData(data => ({
            ...data,
            [name]: finalValue
        }));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        setIsLoading(true)
        updateFilters(formData)
        setFormData(INITIAL_STATE);
        console.log("search filters", filters)
    }

    let formInputs;
    if (!isLoading) {
        formInputs = {
            input1: path[0] === "jobs" ? { name: "title", value: formData.title }
                : { name: "name", value: formData.name },
            input2: path[0] === "jobs" ? { id: "minSalary", name: "minSalary", placeholder: "Minimum salary (optional)", value: formData.minSalary }
                : { id: "minEmployees", name: "minEmployees", placeholder: "Min employees", value: formData.minEmployees },
            input3: path[0] === "jobs" ? { type: "checkbox", id: "hasEquity", name: "hasEquity", value: formData.hasEquity, placeholder: "" }
                : { type: "text", id: "maxEmployees", name: "maxEmployees", placeholder: " Max employees", value: formData.maxEmployees }
        }
    }

    if (!isLoading) {
        return (
            <div className="Search">
                <h2 className="SearchHeader">{title}</h2>
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <div className="Search-searchInput">
                        <input
                            type="text"
                            id="title"
                            name={formInputs.input1.name}
                            placeholder={`Search ${path[0]}`}
                            value={formInputs.input1.value}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Search-filters">
                        <label htmlFor={formInputs.input2.name} className={`SearchForm-label ${formInputs.input2.name}`}>{path[0] === "jobs" ? "Minimum salary:" : "Minimum employees"}</label>
                        <input
                            type="text"
                            id={formInputs.input2.id}
                            name={formInputs.input2.name}
                            placeholder={formInputs.input2.placeholder}
                            value={formInputs.input2.value}
                            onChange={handleChange}
                        />
                        <label htmlFor={formInputs.input3.name} className={`SearchForm-label ${formInputs.input3.name}`}>{path[0] === "jobs" ? "Has Equity?" : "Maximum employees"}</label>
                        <input
                            type={formInputs.input3.type}
                            id={formInputs.input3.id}
                            name={formInputs.input3.name}
                            placeholder={formInputs.input3.placeholder}
                            value={formInputs.input3.value}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="SearchHeader-container">
                        <button className={path[0] === "jobs" ? "SearchHeaderForm-jobsbtn" : "SearchHeaderForm-cobtn"}>Go</button>
                    </div>
                </form>
            </div >
        )
    } else {
        return (
            <Loader />
        )
    }

}

export default Search;