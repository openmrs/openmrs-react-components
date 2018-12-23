import {axiosInstance} from "../../config";

const concept = {
  uuid: "some-concept-uuid"
};

const anotherConcept = {
  uuid: "another-concept-uuid"
};

const api = {
  getConcept: (conceptUUID) =>  {
    if (conceptUUID === concept.uuid) {
      return concept;
    }
    else if (conceptUUID === anotherConcept.uuid) {
      return anotherConcept;
    }
    else {
      return null;
    }
  }
};

export default api;
