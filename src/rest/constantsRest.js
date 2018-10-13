
import { axiosInstance } from '../config';

const api = {

  fetchLabResultsEncounterType: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEncounterType`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsDateConcept: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsDateConcept`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsDidNotPerformQuestion: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformQuestion`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsDidNotPerformReasonQuestion: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformReason`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsDidNotPerformAnswer: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformAnswer`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsTestOrderNumberConcept: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.testOrderNumberConcept`)
      .then((response) => {
        return response.data;
      });
  },
  
  fetchLabResultsTestLocationQuestion: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.locationOfLaboratory`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsEstimatedCollectionDateAnswer: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.estimatedCollectionDateAnswer`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsEstimatedCollectionDateQuestion: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.estimatedCollectionDateQuestion`)
      .then((response) => {
        return response.data;
      });
  },

  getDateFormat: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.dateAndTimeFormat`)
      .then((response) => {
        return response.data;
      });
  },

};

export default api;
