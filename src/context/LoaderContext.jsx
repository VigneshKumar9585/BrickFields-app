import React, { createContext, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import Loader from '../componts/Loader';

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        let requestCounter = 0;

        const requestInterceptor = axios.interceptors.request.use((config) => {
            requestCounter++;
            setLoading(true);
            return config;
        }, (error) => {
            requestCounter--;
            if (requestCounter <= 0) {
                requestCounter = 0; // reset to avoid negative
                setLoading(false);
            }
            return Promise.reject(error);
        });

        const responseInterceptor = axios.interceptors.response.use((response) => {
            requestCounter--;
            if (requestCounter <= 0) {
                requestCounter = 0;
                setLoading(false);
            }
            return response;
        }, (error) => {
            requestCounter--;
            if (requestCounter <= 0) {
                requestCounter = 0;
                setLoading(false);
            }
            return Promise.reject(error);
        });

        // Cleanup interceptors on unmount (though this provider is likely top-level)
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {loading && <Loader />}
            {children}
        </LoaderContext.Provider>
    );
};
