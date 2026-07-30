import generalUtil from '../../util/generalUtil';
import { DATA_TYPES } from '../../domain/concept/constants';

// Namespace used when a consumer of this library doesn't supply its own via the
// formNamespace prop on EncounterForm. react-components is a shared library with
// potentially many downstream consumers, so the namespace identifying "who wrote
// this obs" must come from the consumer, not be hardcoded to any one of them.
const DEFAULT_FORM_NAMESPACE = 'openmrs-react-components';

const util = {

  DEFAULT_FORM_NAMESPACE,

  // given an obs, finds the form and path it was recorded from, via formNamespaceAndPath
  // only obs written under the given namespace are considered "ours" - formFieldPath is
  // shared across OpenMRS applications, so an obs written by another app (e.g. HTML Form
  // Entry, or a different react-components consumer) must not be mistaken for one of ours
  // just because its path happens to have multiple segments
  getFormAndPathFromObs: (obs, namespace) => {

    if (!obs.formFieldPath || obs.formFieldNamespace !== namespace) { return {}; }

    const [form, ...path] = obs.formFieldPath.split("/");

    return {
      form,
      path
    };

  },

  setFormAndPathOnObs: (obs, namespace, form, path) => {
    obs.formFieldNamespace = namespace;
    obs.formFieldPath = [form, ...path].join("/");
  },

  hasFormAndPath: (obs, namespace) => {
    const { form, path } = util.getFormAndPathFromObs(obs, namespace);
    return (typeof form !== 'undefined' && typeof path !== 'undefined' && path.length > 0);
  },

  hasMatchingFormAndPath: (obs, namespace, testForm, testPath) => {
    const { form, path } = util.getFormAndPathFromObs(obs, namespace);
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

  },

  // given the (possibly nested) obs off an encounter, returns a flat { fieldName: value } object of the
  // obs that belong to this app under the given namespace (per hasFormAndPath) and have a value,
  // suitable for use as redux-form initial values. coded/boolean obs are unwrapped to their answer
  // concept uuid.
  existingObsValues: (obs, namespace) => {

    return util.flattenObs(obs)
      .filter((o) => util.hasFormAndPath(o, namespace) && o.concept && o.concept.uuid && o.value)  // filter out any obs with missing information
      .map((o) => ({                                                                    // map to the key/value pair
        [util.obsFieldName(util.getFormAndPathFromObs(o, namespace).path, o.conceptPath)]:
          (o.concept.datatype && (o.concept.datatype.uuid === DATA_TYPES['coded'].uuid || o.concept.datatype.uuid === DATA_TYPES['boolean'].uuid)
            ? o.value.uuid : o.value)
      }))
      .reduce((acc, item) => {                                                          // reduce array to single object
        const key = Object.keys(item)[0];
        acc[key] = item[key];
        return acc;
      }, {});

  }

};

export default util;
