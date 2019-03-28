
import { axiosInstance } from '../config';

// TODO: this all needs to be refactored, see: https://tickets.pih-emr.org/browse/UHM-3796

const api = {

  fetchLabResultsTestOrderType: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.testOrderType`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsEncounterType: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEncounterType`)
      .then((response) => {
        return response.data;
      });
  },

  fetchLabResultsEncounterRole: () => {
    return axiosInstance.get(`systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEncounterRole`)
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

  fetchLabResultsDidNotPerformReasonAnswer: (conceptUuid) => {
    return axiosInstance.get(`/concept/${conceptUuid}`)
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

  fetchLabResultsTestLocationAnswer: (conceptUuid) => {
    return axiosInstance.get(`/concept/${conceptUuid}`)
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
