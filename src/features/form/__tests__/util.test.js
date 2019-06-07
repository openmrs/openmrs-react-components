
import formUtil from '../util';

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

  /*it('should create field name with extra parameters', () => {

    const fieldName = formUtil.obsFieldName(["some_path"], ["some_concept_path"], ["inverted", "special"]);
    expect(fieldName).toEqual("obs|path=some_path|conceptPath=some_concept_path|inverted^special");

  });

  it('should create field name with extra parameters as string', () => {

    const fieldName = formUtil.obsFieldName(["some_path"], ["some_concept_path"], ["inverted^special"]);
    expect(fieldName).toEqual("obs|path=some_path|conceptPath=some_concept_path|inverted^special");

  });*/

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
        "comment": "form-id^grouping",
        "concept": {
          "uuid": "grouping_uuid"
        },
        "groupMembers":  [
          { "comment": "form-id^grouping^first-nested-obs",
            "concept": {
              "uuid": "first-obs-uuid"
            },
            "value": 100
          },
          { "comment": "form-id^grouping^second-nested-obs",
            "concept": {
              "uuid": "second-obs-uuid"
            },
            "value": 200
          }
        ]
      },
      {
        "comment": "form-id^second_grouping",
        "concept": {
          "uuid": "second_grouping_uuid"
        },
        "groupMembers":  [
          { "comment": "form-id^second_grouping^first-nested-obs",
            "concept": {
              "uuid": "first-obs-uuid"
            },
            "groupMembers": [
              {
                "comment": "form-id^second_grouping^first-nested-obs^double-nested-obs",
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
        "comment": "form-id^grouping^first-nested-obs",
        "concept": {
          "uuid": "first-obs-uuid"
        },
        "conceptPath": "grouping_uuid^first-obs-uuid",
        "value": 100
      },
      { "comment": "form-id^grouping^second-nested-obs",
        "concept": {
          "uuid": "second-obs-uuid"
        },
        "conceptPath": "grouping_uuid^second-obs-uuid",
        "value": 200
      },
      {
        "comment": "form-id^grouping",
        "concept": {
          "uuid": "grouping_uuid"
        },
        "conceptPath": "grouping_uuid",
      },
      {
        "comment": "form-id^second_grouping^first-nested-obs^double-nested-obs",
        "concept": {
          "uuid": "second-obs-uuid"
        },
        "conceptPath": "second_grouping_uuid^first-obs-uuid^second-obs-uuid",
        "value": 400
      },
      {
        "comment": "form-id^second_grouping^first-nested-obs",
        "concept": {
          "uuid": "first-obs-uuid"
        },
        "conceptPath": "second_grouping_uuid^first-obs-uuid",
      },
      {
        "comment": "form-id^second_grouping",
        "concept": {
          "uuid": "second_grouping_uuid"
        },
        "conceptPath": "second_grouping_uuid",
      }
    ];

    expect(formUtil.flattenObs(obs)).toEqual(expectedFlattened);

  });

  it('should extract form and path from obs comment', () => {

    const obs = {
      comment: "form-id^second_grouping^first-nested-obs^double-nested-obs"
    };

    const { form, path } = formUtil.getFormAndPathFromObs(obs);
    expect(form).toEqual("form-id");
    expect(path).toEqual(["second_grouping", "first-nested-obs", "double-nested-obs"]);

  });

  it('should set form and path on obs comment', () => {

    let obs = {
      comment: ""
    };

    const form = "form-id";
    const path = ["second_grouping", "first-nested-obs", "double-nested-obs"];

    formUtil.setFormAndPathOnObs(obs, form, path);

    expect(obs.comment).toEqual("form-id^second_grouping^first-nested-obs^double-nested-obs");

  });

  it('should properly compare obs with form and path', () => {

    const obs = {
      comment: "form-id^second_grouping^first-nested-obs^double-nested-obs"
    };

    expect(formUtil.hasMatchingFormAndPath(obs, "form-id", ["second_grouping", "first-nested-obs", "double-nested-obs"])).toEqual(true);
    expect(formUtil.hasMatchingFormAndPath(obs, "another-form-id", ["second_grouping", "first-nested-obs", "double-nested-obs"])).toEqual(false);
    expect(formUtil.hasMatchingFormAndPath(obs, "form-id", ["different_second_grouping", "first-nested-obs", "double-nested-obs"])).toEqual(false);
  });

  it ('hasFormAndPath should return true if obs has form and path', () => {

    const obs = {
      comment: "form-id^second_grouping^first-nested-obs^double-nested-obs"
    };

    expect(formUtil.hasFormAndPath(obs)).toEqual(true);

  });

  it ('hasFormAndPath should return false if does not have form and path', () => {

    const obs = {
      comment: "just a typical comment"
    };

    expect(formUtil.hasFormAndPath(obs)).toEqual(false);

  });

  it ('hasFormAndPath should return false if empty comment', () => {

    const obs = {
      comment: ""
    };

    expect(formUtil.hasFormAndPath(obs)).toEqual(false);

  });

  it ('hasFormAndPath should return false if no comment', () => {

    const obs = {};

    expect(formUtil.hasFormAndPath(obs)).toEqual(false);

  });


});
