
import util from '../util';

describe('obs util', () => {

  it('should flatten grouped obs', () => {

    const obs =   [
      {
        "concept": {
          "uuid": "grouping_uuid"
        },
        "groupMembers":  [
          {
            "concept": {
              "uuid": "first-obs-uuid"
            },
            "value": 100
          },
          {
            "concept": {
              "uuid": "second-obs-uuid"
            },
            "value": 200
          }
        ]
      },
      {

        "concept": {
          "uuid": "second_grouping_uuid"
        },
        "groupMembers":  [
          {
            "concept": {
              "uuid": "first-obs-uuid"
            },
            "groupMembers": [
              {
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
        "concept": {
          "uuid": "first-obs-uuid"
        },
        "value": 100
      },
      {
        "concept": {
          "uuid": "second-obs-uuid"
        },
        "value": 200
      },
      {
        "concept": {
          "uuid": "grouping_uuid"
        },
      },
      {
        "concept": {
          "uuid": "second-obs-uuid"
        },
        "value": 400
      },
      {
        "concept": {
          "uuid": "first-obs-uuid"
        },
      },
      {
        "concept": {
          "uuid": "second_grouping_uuid"
        },
      }
    ];

    expect(util.flattenObs(obs)).toEqual(expectedFlattened);

  });



});
