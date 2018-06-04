import axios from 'axios';

// this allows consuming create-react-app apps to inject the server name URL and context path (at build time) via the REACT_APP_CONTEXT_PATH variable,
// see: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables
// otherwise uses the current context path taken from examining the window object

const apiBaseUrl  = (typeof process !== 'undefined' && typeof process.env !== 'undefined' &&
  typeof process.env.REACT_APP_CONTEXT_PATH  !== 'undefined' && process.env.REACT_APP_CONTEXT_PATH !== null) ?
  `${process.env.REACT_APP_CONTEXT_PATH}/ws/rest/v1` : `/${window.location.href.split('/')[3]}/ws/rest/v1`;

export const axiosConfig = {
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const axiosInstance = axios.create(axiosConfig);

