

const util = {

  // TODO update this next two methods to use form field and namespace instead of comment when running OpenMRS 1.11+
  getFormAndPathFromObs: (obs) => {

    const [form, ...path] = obs.comment.split("^");

    return {
      form,
      path
    };

  },

  setFormAndPathOnObs: (obs, form, path) => {
    obs.comment = form + "^" + path.join("^");
  },

  hasMatchingFormAndPath: (obs, testForm, testPath) => {
    const { form, path } = util.getFormAndPathFromObs(obs);
    return form === testForm && util.areEqual(path, testPath);
  },

  // note that this should handle both arrays for path and concepts, as well as strings
  // if strings, it assumes that the join("^") has already been performed
  obsFieldName: (path, concepts) => {
    return `obs|path=${Array.isArray(path) ? path.join("^") : path}|conceptPath=${Array.isArray(concepts) ? concepts.join("^") : concepts}`;
  },

  parseObsFieldName: (fieldName) => {
    const fieldElements = fieldName.split('|');

    return {
      path: fieldElements[1].split('=')[1].split('^'),
      concepts: fieldElements[2].split('=')[1].split('^')
    };
  },

  conceptAnswerDisplay: (value, conceptAnswers) => {

    if (value) {
      const matchingAnswer = conceptAnswers.find(ans => ans.uuid === value);

      if (matchingAnswer.display) {
        return matchingAnswer.display;
      }

      if (matchingAnswer.name) {
        return matchingAnswer.name.display ? matchingAnswer.name.display : matchingAnswer.name;
      }

      return null;
    }
    else {
      return null;
    }
  },

  flattenObs: (obs, acc = [], path = []) => {

    if (!obs) {
      return acc;
    }

    return obs.reduce((acc, obs) => {
      const { groupMembers, ...obsWithoutGroupMembers } = obs;
      obsWithoutGroupMembers.conceptPath = [...path, obs.concept.uuid].join('^');
      return [...util.flattenObs(groupMembers, acc, [...path, obs.concept.uuid]), obsWithoutGroupMembers];
    }, acc);

  },

  // TODO this could be used in more than forms, potentially moved somewhere else?
  // converts an array of key-value pairs to a single object with those properties
  arrayToObjectReducer: (acc, item) => {
    var key = Object.keys(item)[0];
    acc[key] = item[key];
    return acc;
  },

  // TODO this could be used in more than forms, potentially moved somewhere else?
  areEqual(array1, array2) {
    let equal =false;
    let json1 = null;
    let json2 = null;
    if ( array1 === null && array2 === null) {
      equal = true;
    }
    if (array1 !== null ) {
      json1 = JSON.stringify(array1);
    }
    if (array2 !== null ) {
      json2 = JSON.stringify(array2);
    }
    if (json1 === json2) {
      equal = true;
    }
    return equal;
  }


};

export default util;
