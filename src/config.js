import axios from 'axios';

// this allows consuming create-react-app apps to inject the server address URL and context path (at build time)
// via the REACT_APP_SERVER_ADDRESS and REACT_APP_CONTEXT_PATH environment variables
// see: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
// otherwise doesn't set the address and gets the context path by examining the window object

const serverAddress = (typeof process !== 'undefined' && typeof process.env !== 'undefined' &&
  typeof process.env.REACT_APP_SERVER_ADDRESS  !== 'undefined' && process.env.REACT_APP_SERVER_ADDRESS !== null) ?
  process.env.REACT_APP_SERVER_ADDRESS  : "";

const contextPath  = (typeof process !== 'undefined' && typeof process.env !== 'undefined' &&
  typeof process.env.REACT_APP_SERVER_CONTEXT_PATH  !== 'undefined' && process.env.REACT_APP_SERVER_CONTEXT_PATH !== null) ?
  process.env.REACT_APP_SERVER_CONTEXT_PATH : window.location.href.split('/')[3];

const apiBaseUrl = `${serverAddress}${contextPath}/ws/rest/v1`;

export const axiosConfig = {
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const axiosInstance = axios.create(axiosConfig);

