
const concept = {
  uuid: "some-concept-uuid",
  name: "some name"
};

const anotherConcept = {
  uuid: "another-concept-uuid",
  name: "another-name"
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
