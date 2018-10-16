
import formUtil from '../util';

describe('form util', () => {

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

});
