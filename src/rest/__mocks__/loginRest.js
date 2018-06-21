const api = {

  login: (params) => {
    if (params.username === "valid_username" && params.password === "valid_password") {
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
