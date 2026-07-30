
import formUtil from '../util';
import { DATA_TYPES } from '../../../domain/concept/constants';

describe('form util', () => {

  it('should create field name with single path elements', () => {

    const fieldName = formUtil.obsFieldName(["some_path"], ["some_concept_path"]);
    expect(fieldName).toEqual("obs|path=some_path|conceptPath=some_concept_path");

  });

  it('should create field name with multiple elements', () => {

    const fieldName = formUtil.obsFieldName(["some_path_element", "another_path_element"],
      ["some_concept_path_element", "another_concept_path_element"]);
    expect(fieldName).toEqual("obs|path=some_path_element^another_path_element|conceptPath=some_concept_path_element^another_concept_path_element");

  });

  it('should create field name with concepts passed in as objects', () => {
    const fieldName = formUtil.obsFieldName(["some_path_element", "another_path_element"],
      [{ uuid: "some_concept_path_element" }, { uuid: "another_concept_path_element"} ]);
    expect(fieldName).toEqual("obs|path=some_path_element^another_path_element|conceptPath=some_concept_path_element^another_concept_path_element");
  });

  it('should create field name when passed string instead of array', () => {

    const fieldName = formUtil.obsFieldName("some_path_element^another_path_element", "some_concept_path_element^another_concept_path_element");
    expect(fieldName).toEqual("obs|path=some_path_element^another_path_element|conceptPath=some_concept_path_element^another_concept_path_element");

  });

  it('should parse field name with single path elements', () => {
    const { path, concepts } = formUtil.parseObsFieldName("obs|path=some_path|conceptPath=some_concept_path");
    expect(path).toEqual(["some_path"]);
    expect(concepts).toEqual(["some_concept_path"]);
  });

  it('should parse field name with multiple path elements', () => {
    const { path, concepts } = formUtil.parseObsFieldName("obs|path=some_path_element^another_path_element|conceptPath=some_concept_path_element^another_concept_path_element");
    expect(path).toEqual(["some_path_element", "another_path_element"]);
    expect(concepts).toEqual(["some_concept_path_element", "another_concept_path_element"]);
  });

  it('should flatten grouped obs', () => {

    const obs =   [
      {
        "formFieldPath": "form-id/grouping",
        "concept": {
          "uuid": "grouping_uuid"
        },
        "groupMembers":  [
          { "formFieldPath": "form-id/grouping/first-nested-obs",
            "concept": {
              "uuid": "first-obs-uuid"
            },
            "value": 100
          },
          { "formFieldPath": "form-id/grouping/second-nested-obs",
            "concept": {
              "uuid": "second-obs-uuid"
            },
            "value": 200
          }
        ]
      },
      {
        "formFieldPath": "form-id/second_grouping",
        "concept": {
          "uuid": "second_grouping_uuid"
        },
        "groupMembers":  [
          { "formFieldPath": "form-id/second_grouping/first-nested-obs",
            "concept": {
              "uuid": "first-obs-uuid"
            },
            "groupMembers": [
              {
                "formFieldPath": "form-id/second_grouping/first-nested-obs/double-nested-obs",
                "concept": {
                  "uuid": "second-obs-uuid"
                },
                "value": 400
              }
            ]
          }
        ]
      }
    ];

    const expectedFlattened = [
      {
        "formFieldPath": "form-id/grouping/first-nested-obs",
        "concept": {
          "uuid": "first-obs-uuid"
        },
        "conceptPath": "grouping_uuid^first-obs-uuid",
        "value": 100
      },
      { "formFieldPath": "form-id/grouping/second-nested-obs",
        "concept": {
          "uuid": "second-obs-uuid"
        },
        "conceptPath": "grouping_uuid^second-obs-uuid",
        "value": 200
      },
      {
        "formFieldPath": "form-id/grouping",
        "concept": {
          "uuid": "grouping_uuid"
        },
        "conceptPath": "grouping_uuid",
      },
      {
        "formFieldPath": "form-id/second_grouping/first-nested-obs/double-nested-obs",
        "concept": {
          "uuid": "second-obs-uuid"
        },
        "conceptPath": "second_grouping_uuid^first-obs-uuid^second-obs-uuid",
        "value": 400
      },
      {
        "formFieldPath": "form-id/second_grouping/first-nested-obs",
        "concept": {
          "uuid": "first-obs-uuid"
        },
        "conceptPath": "second_grouping_uuid^first-obs-uuid",
      },
      {
        "formFieldPath": "form-id/second_grouping",
        "concept": {
          "uuid": "second_grouping_uuid"
        },
        "conceptPath": "second_grouping_uuid",
      }
    ];

    expect(formUtil.flattenObs(obs)).toEqual(expectedFlattened);

  });

  it('should extract form and path from obs formFieldPath, given the caller\'s namespace', () => {

    const obs = {
      formFieldNamespace: "some-app",
      formFieldPath: "form-id/second_grouping/first-nested-obs/double-nested-obs"
    };

    const { form, path } = formUtil.getFormAndPathFromObs(obs, "some-app");
    expect(form).toEqual("form-id");
    expect(path).toEqual(["second_grouping", "first-nested-obs", "double-nested-obs"]);

  });

  it('should return empty object if formFieldPath is set but formFieldNamespace does not match (obs belongs to another app)', () => {

    const obsWithForeignNamespace = {
      formFieldNamespace: "HtmlFormEntry",
      formFieldPath: "someForm/someField"
    };

    const obsWithMissingNamespace = {
      formFieldPath: "someForm/someField"
    };

    expect(formUtil.getFormAndPathFromObs(obsWithForeignNamespace, "some-app")).toEqual({});
    expect(formUtil.getFormAndPathFromObs(obsWithMissingNamespace, "some-app")).toEqual({});
    expect(formUtil.hasFormAndPath(obsWithForeignNamespace, "some-app")).toEqual(false);
    expect(formUtil.hasFormAndPath(obsWithMissingNamespace, "some-app")).toEqual(false);

  });

  it('should set form and path on obs formFieldPath, using the namespace the caller provides', () => {

    let obs = {};

    const form = "form-id";
    const path = ["second_grouping", "first-nested-obs", "double-nested-obs"];

    formUtil.setFormAndPathOnObs(obs, "some-app", form, path);

    expect(obs.formFieldNamespace).toEqual("some-app");
    expect(obs.formFieldPath).toEqual("form-id/second_grouping/first-nested-obs/double-nested-obs");

  });

  it('should default to DEFAULT_FORM_NAMESPACE when the caller uses that constant', () => {

    let obs = {};

    formUtil.setFormAndPathOnObs(obs, formUtil.DEFAULT_FORM_NAMESPACE, "form-id", ["some-field"]);

    expect(obs.formFieldNamespace).toEqual("openmrs-react-components");
    expect(formUtil.getFormAndPathFromObs(obs, formUtil.DEFAULT_FORM_NAMESPACE)).toEqual({
      form: "form-id",
      path: ["some-field"]
    });

  });

  it('should properly compare obs with form and path', () => {

    const obs = {
      formFieldNamespace: "some-app",
      formFieldPath: "form-id/second_grouping/first-nested-obs/double-nested-obs"
    };

    expect(formUtil.hasMatchingFormAndPath(obs, "some-app", "form-id", ["second_grouping", "first-nested-obs", "double-nested-obs"])).toEqual(true);
    expect(formUtil.hasMatchingFormAndPath(obs, "some-app", "another-form-id", ["second_grouping", "first-nested-obs", "double-nested-obs"])).toEqual(false);
    expect(formUtil.hasMatchingFormAndPath(obs, "some-app", "form-id", ["different_second_grouping", "first-nested-obs", "double-nested-obs"])).toEqual(false);
  });

  it('should not match obs with form and path if formFieldNamespace does not match (belongs to another app)', () => {

    const obs = {
      formFieldNamespace: "HtmlFormEntry",
      formFieldPath: "form-id/second_grouping/first-nested-obs/double-nested-obs"
    };

    expect(formUtil.hasMatchingFormAndPath(obs, "some-app", "form-id", ["second_grouping", "first-nested-obs", "double-nested-obs"])).toEqual(false);
  });

  it ('hasFormAndPath should return true if obs has form and path', () => {

    const obs = {
      formFieldNamespace: "some-app",
      formFieldPath: "form-id/second_grouping/first-nested-obs/double-nested-obs"
    };

    expect(formUtil.hasFormAndPath(obs, "some-app")).toEqual(true);

  });

  it ('hasFormAndPath should return false if formFieldPath has no path segment beyond the form', () => {

    const obs = {
      formFieldNamespace: "some-app",
      formFieldPath: "just-a-form-id-no-path"
    };

    expect(formUtil.hasFormAndPath(obs, "some-app")).toEqual(false);

  });

  it ('hasFormAndPath should return false if empty formFieldPath', () => {

    const obs = {
      formFieldPath: ""
    };

    expect(formUtil.hasFormAndPath(obs, "some-app")).toEqual(false);

  });

  it ('hasFormAndPath should return false if no formFieldPath', () => {

    const obs = {};

    expect(formUtil.hasFormAndPath(obs, "some-app")).toEqual(false);

  });

  describe('existingObsValues', () => {

    it('should include obs with formFieldNamespace/formFieldPath and a value, keyed by the computed field name', () => {

      const obs = [
        {
          formFieldNamespace: "some-app",
          formFieldPath: "form-id/some-field",
          concept: { uuid: "some-concept-uuid" },
          value: 100
        }
      ];

      const existingValues = formUtil.existingObsValues(obs, "some-app");

      expect(existingValues).toEqual({
        [formUtil.obsFieldName(["some-field"], "some-concept-uuid")]: 100
      });

    });

    it('should exclude obs with no formFieldPath (never tracked, or foreign-namespace obs)', () => {

      const obs = [
        {
          formFieldPath: null,
          concept: { uuid: "some-concept-uuid" },
          value: 100
        }
      ];

      expect(formUtil.existingObsValues(obs, "some-app")).toEqual({});

    });

    it('should exclude obs written under a different namespace', () => {

      const obs = [
        {
          formFieldNamespace: "some-other-app",
          formFieldPath: "form-id/some-field",
          concept: { uuid: "some-concept-uuid" },
          value: 100
        }
      ];

      expect(formUtil.existingObsValues(obs, "some-app")).toEqual({});

    });

    it('should exclude obs with formFieldPath set but no value', () => {

      const obs = [
        {
          formFieldNamespace: "some-app",
          formFieldPath: "form-id/some-field",
          concept: { uuid: "some-concept-uuid" }
        }
      ];

      expect(formUtil.existingObsValues(obs, "some-app")).toEqual({});

    });

    it('should unwrap coded and boolean values to the answer concept uuid', () => {

      const obs = [
        {
          formFieldNamespace: "some-app",
          formFieldPath: "form-id/coded-field",
          concept: { uuid: "coded-concept-uuid", datatype: DATA_TYPES['coded'] },
          value: { uuid: "answer-concept-uuid" }
        },
        {
          formFieldNamespace: "some-app",
          formFieldPath: "form-id/boolean-field",
          concept: { uuid: "boolean-concept-uuid", datatype: DATA_TYPES['boolean'] },
          value: { uuid: "true-concept-uuid" }
        }
      ];

      const existingValues = formUtil.existingObsValues(obs, "some-app");

      expect(existingValues).toEqual({
        [formUtil.obsFieldName(["coded-field"], "coded-concept-uuid")]: "answer-concept-uuid",
        [formUtil.obsFieldName(["boolean-field"], "boolean-concept-uuid")]: "true-concept-uuid"
      });

    });

  });

});
