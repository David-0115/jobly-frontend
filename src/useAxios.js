import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:3001"

const useAxios = () => {
    const [apiData, setApiData] = useState();
    const [apiConfig, setApiConfig] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const { path, method, data } = apiConfig
                let response;
                if (method === "get" || method === "delete") {
                    response = await axios[method](`${BASE_URL}/${path}`)
                } else {
                    response = await axios[method](`${BASE_URL}/${path}`, data)
                }
                setApiData(response.data)
                setError(null)
            } catch (e) {
                setError(e);
                setApiData(null)
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [apiConfig])

    const setConfig = (newConfig) => {
        setApiConfig(newConfig);
        setLoading(true)
    };

    return { apiData, loading, error, setConfig }
}

export default useAxios;
