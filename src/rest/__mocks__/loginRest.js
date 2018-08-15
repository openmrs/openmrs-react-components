const api = {

  login: (params) => {
    if (params.authorization === "Basic dmFsaWRfdXNlcm5hbWU6dmFsaWRfcGFzc3dvcmQ=") {
      return {
        authenticated:true
      };
    }
    else {
      return {
        authenticated: false
      };
    }
  }

};

export default api;
