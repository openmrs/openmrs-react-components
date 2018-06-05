import { axiosInstance } from '../config';


const api = {

    findPatient: (params) => {
        return axiosInstance.get('patient?' + params.query)
            .then((response) => response.data);
    },

};

export default api;