import axios from 'axios';

const contextPath = window.location.href.split('/')[3];
const apiBaseUrl = `/${contextPath}/ws/rest/v1`;

export const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    accept: 'application/json',
  },
});

