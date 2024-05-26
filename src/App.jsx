import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import JoblyRoutes from './JoblyRoutes';
import Alert from './Alert';
import useCookies from './useCookies';


function App() {
  const [user, setUser] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [companies, setCompanies] = useState(null)
  const [filters, setFilters] = useState(null)
  const [userMessage, setUserMessage] = useState(null)
  const { getCookie } = useCookies()

  useEffect(() => {
    const userCookie = getCookie("user")
    if (userCookie) {
      setUser(userCookie)
    }
  }, [])

  const updateUser = (val) => {
    setUser(val);
  }

  const updateJobs = (val) => {
    setJobs(val)
  }

  const updateCompanies = (val) => {
    setCompanies(val)
  }

  const updateFilters = (val) => {
    setFilters(val)
  }

  const updateUserMessage = (val) => {
    setUserMessage(val)
  }

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={
          {
            user, updateUser,
            jobs, updateJobs,
            companies, updateCompanies,
            filters, updateFilters,
            userMessage, updateUserMessage
          }}>
          {userMessage ? <Alert /> : ""}
          <Navbar />
          <JoblyRoutes />
        </AppContext.Provider>
      </BrowserRouter >
    </>
  )
}

export default App
