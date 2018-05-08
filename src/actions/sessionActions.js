
import { axiosInstance } from '../config';

export const fetchCurrentSession = () => {
  return dispatch => axiosInstance.get(`appui/session`)
    .then((response) => {
      dispatch({
        type: "SET_CURRENT_SESSION",
        session: response.data,
      });
    });
};
