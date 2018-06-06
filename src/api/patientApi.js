import { axiosInstance } from '../config';


const api = {

    findPatient: (params) => {
        return axiosInstance.get('patient?q=' + params.query + "&v=" + params.representation)
            .then((response) => response);
    },

};

export default api;