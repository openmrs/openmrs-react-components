import generalUtil from '../../util/generalUtil';

const FORM_NAMESPACE = 'labworkflow';

const util = {

  FORM_NAMESPACE,

  // given an obs, finds the form and path it was recorded from, via formNamespaceAndPath
  getFormAndPathFromObs: (obs) => {

    if (!obs.formFieldPath) { return {}; }

    const [form, ...path] = obs.formFieldPath.split("/");

    return {
      form,
      path
    };

  },

  setFormAndPathOnObs: (obs, form, path) => {
    obs.formFieldNamespace = FORM_NAMESPACE;
    obs.formFieldPath = [form, ...path].join("/");
  },

  hasFormAndPath: (obs) => {
    const { form, path } = util.getFormAndPathFromObs(obs);
    return (typeof form !== 'undefined' && typeof path !== 'undefined' && path.length > 0);
  },

  hasMatchingFormAndPath: (obs, testForm, testPath) => {
    const { form, path } = util.getFormAndPathFromObs(obs);
    return form === testForm && generalUtil.areEqualArrays(path, testPath);
  },

  // note that this should handle concepts of various types:
  // concepts == string => pass straight through (assume already concatenated with ^)
  // concepts == Array(string) => join elements using "^"
  // concepts == Array(object) => map each object to o.uuid and then join using "^"
  obsFieldName: (path, concepts) => {

    const conceptPath = Array.isArray(concepts) ?
      concepts.map(c => c.uuid ? c.uuid : c).join("^") :
      concepts;

    return `obs|path=${Array.isArray(path) ? path.join("^") : path}|conceptPath=${conceptPath}`;
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

  // TODO this could be used in more than forms, potentially moved somewhere else?
  flattenObs: (obs, acc = [], path = []) => {

    if (!obs) {
      return acc;
    }

    return obs.reduce((acc, obs) => {
      const { groupMembers, ...obsWithGroupMembersRemoved } = obs;
      obsWithGroupMembersRemoved.conceptPath = [...path, obs.concept.uuid].join('^');
      return [...util.flattenObs(groupMembers, acc, [...path, obs.concept.uuid]), obsWithGroupMembersRemoved];
    }, acc);

  }

};

export default util;
