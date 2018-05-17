import axios from 'axios';

// TODO ability to specify URL of server

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

// TODO: pull this out into configuration for testing
//const apiBaseUrl = "http://localhost:8080/openmrs/ws/rest/v1";

export const axiosConfig = {
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const axiosInstance = axios.create(axiosConfig);

