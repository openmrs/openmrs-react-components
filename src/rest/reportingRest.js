import { axiosInstance } from '../config';

const api = {

  getDataSet: (params) => {
    return axiosInstance.get("reportingrest/dataSet/" + params.datasetName + "/"
      + ( params.endDate ? "?endDate=" + params.endDate : '')
      + ( params.location ? "&location=" + params.location : '')
      + ( params.patient ? "&patient=" + params.patient : '')
    )
      .then((response) => {
        if (response.status !== 200) {
          throw response;
        }
        else {
          return response.data;
        }
      });
  }

};

export default api;
