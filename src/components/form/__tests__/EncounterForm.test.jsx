import React from 'react';
import configureMockStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {Form} from 'react-bootstrap';
import EncounterForm from '../EncounterForm';

let props, store;
let mountedComponent;

const encounter = {
  "uuid": "581837a9-75b4-4233-8456-9635983b5eab",
  "display": "Signes vitaux 21/03/2018",
  "encounterDatetime": "2018-03-21T12:01:00.000-0400",
  "patient": {
    "uuid": "ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac",
    "display": "Y2A25W - TestPatient Dave",
    "links": [
      {
        "rel": "self",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/patient/ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac"
      }
    ]
  },
  "location": {
    "uuid": "199e7d87-92a0-4398-a0f8-11d012178164",
    "display": "Klinik Ekstèn",
    "name": "Klinik Ekstèn",
    "description": "The outpatient clinic at Mirebalais Hospital (Klinik Extern).",
    "address1": null,
    "address2": null,
    "cityVillage": null,
    "stateProvince": null,
    "country": null,
    "postalCode": null,
    "latitude": null,
    "longitude": null,
    "countyDistrict": null,
    "address3": null,
    "address4": null,
    "address5": null,
    "address6": null,
    "tags": [
      {
        "uuid": "d31ced52-9103-4b01-81ae-69f1bb216a6a",
        "display": "HIV Consult Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/d31ced52-9103-4b01-81ae-69f1bb216a6a"
          }
        ]
      },
      {
        "uuid": "0ba7b0d0-e1ef-11e4-b571-0800200c9a66",
        "display": "Order Radiology Study Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/0ba7b0d0-e1ef-11e4-b571-0800200c9a66"
          }
        ]
      },
      {
        "uuid": "9783aba6-df7b-4969-be6e-1e03e7a08965",
        "display": "Transfer Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/9783aba6-df7b-4969-be6e-1e03e7a08965"
          }
        ]
      },
      {
        "uuid": "2b5c7110-d571-4f5f-b84e-500070b40ef8",
        "display": "Appointment Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/2b5c7110-d571-4f5f-b84e-500070b40ef8"
          }
        ]
      },
      {
        "uuid": "5a1a98d0-0805-11e6-a837-0800200c9a66",
        "display": "Lab Results Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/5a1a98d0-0805-11e6-a837-0800200c9a66"
          }
        ]
      },
      {
        "uuid": "d3bb01c0-00f3-11e6-a837-0800200c9a66",
        "display": "NCD Consult Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/d3bb01c0-00f3-11e6-a837-0800200c9a66"
          }
        ]
      },
      {
        "uuid": "24ffeea6-dfbb-11e4-bccc-56847afe9799",
        "display": "Check-In Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/24ffeea6-dfbb-11e4-bccc-56847afe9799"
          }
        ]
      },
      {
        "uuid": "5e824f3a-dfb8-11e4-bccc-56847afe9799",
        "display": "Inpatients App Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/5e824f3a-dfb8-11e4-bccc-56847afe9799"
          }
        ]
      },
      {
        "uuid": "993af5d0-57ea-11e5-a837-0800200c9a66",
        "display": "Oncology Consult Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/993af5d0-57ea-11e5-a837-0800200c9a66"
          }
        ]
      },
      {
        "uuid": "a6f68610-e53c-11e4-b571-0800200c9a66",
        "display": "Registration and Check-In Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/a6f68610-e53c-11e4-b571-0800200c9a66"
          }
        ]
      },
      {
        "uuid": "b8bbf83e-645f-451f-8efe-a0db56f09676",
        "display": "Login Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/b8bbf83e-645f-451f-8efe-a0db56f09676"
          }
        ]
      },
      {
        "uuid": "dea8febf-0bbe-4111-8152-a9cf7df622b6",
        "display": "Consult Note Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/dea8febf-0bbe-4111-8152-a9cf7df622b6"
          }
        ]
      },
      {
        "uuid": "d9865139-dfb4-11e4-bccc-56847afe9799",
        "display": "Vitals Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/d9865139-dfb4-11e4-bccc-56847afe9799"
          }
        ]
      },
      {
        "uuid": "728f5f07-f748-4efa-9abe-b6df64e84c92",
        "display": "Order Pathology Location",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/locationtag/728f5f07-f748-4efa-9abe-b6df64e84c92"
          }
        ]
      }
    ],
    "parentLocation": {
      "uuid": "24bd1390-5959-11e4-8ed6-0800200c9a66",
      "display": "Hôpital Universitaire de Mirebalais - Prensipal",
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/24bd1390-5959-11e4-8ed6-0800200c9a66"
        }
      ]
    },
    "childLocations": [
      {
        "uuid": "79892ece-79f1-4674-abb5-a52c1898c762",
        "display": "Klinik Ekstèn Famasi",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/79892ece-79f1-4674-abb5-a52c1898c762"
          }
        ]
      }
    ],
    "retired": false,
    "attributes": [
      {
        "uuid": "350badbe-82a1-42f6-81a3-e2f7aaec5d1e",
        "display": "Location Code: M005",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164/attribute/350badbe-82a1-42f6-81a3-e2f7aaec5d1e"
          }
        ]
      },
      {
        "uuid": "bfec21c3-6429-426b-b2a3-c2379b8a27a2",
        "display": "Default ID card Printer: Printer[hashCode=62a6388b,uuid=ef9a8933-3433-46be-8fc6-200060f4fc72]",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164/attribute/bfec21c3-6429-426b-b2a3-c2379b8a27a2"
          }
        ]
      },
      {
        "uuid": "b1650588-a738-4e13-be54-ff7da21af25e",
        "display": "Default Label Printer: Printer[hashCode=8613c66c,uuid=eb60696e-bf5a-4c19-b2c3-6a256e2cf6db]",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164/attribute/b1650588-a738-4e13-be54-ff7da21af25e"
          }
        ]
      },
      {
        "uuid": "b4b89668-e60d-45f0-b550-125c7da3e189",
        "display": "Default Wristband Printer: Printer[hashCode=6c08aa63,uuid=6bed3067-478d-43d6-b1c0-38c4dc3dd860]",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164/attribute/b4b89668-e60d-45f0-b550-125c7da3e189"
          }
        ]
      }
    ],
    "address7": null,
    "address8": null,
    "address9": null,
    "address10": null,
    "address11": null,
    "address12": null,
    "address13": null,
    "address14": null,
    "address15": null,
    "links": [
      {
        "rel": "self",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164"
      },
      {
        "rel": "full",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164?v=full"
      }
    ],
    "resourceVersion": "2.0"
  },
  "form": {
    "uuid": "68728aa6-4985-11e2-8815-657001b58a90",
    "display": "Signes vitaux",
    "name": "Vitals",
    "description": null,
    "encounterType": {
      "uuid": "4fb47712-34a6-40d2-8ed3-e153abbd25b7",
      "display": "Signes vitaux",
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encountertype/4fb47712-34a6-40d2-8ed3-e153abbd25b7"
        }
      ]
    },
    "version": "2.1",
    "build": null,
    "published": false,
    "formFields": [],
    "retired": false,
    "resources": [],
    "links": [
      {
        "rel": "self",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/form/68728aa6-4985-11e2-8815-657001b58a90"
      },
      {
        "rel": "full",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/form/68728aa6-4985-11e2-8815-657001b58a90?v=full"
      }
    ],
    "resourceVersion": "1.9"
  },
  "encounterType": {
    "uuid": "4fb47712-34a6-40d2-8ed3-e153abbd25b7",
    "display": "Signes vitaux",
    "name": "Signes vitaux",
    "description": "Encounter where vital signs were captured, and triage may have been done, possibly for triage purposes, but a complete exam was not done.",
    "retired": false,
    "links": [
      {
        "rel": "self",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encountertype/4fb47712-34a6-40d2-8ed3-e153abbd25b7"
      },
      {
        "rel": "full",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encountertype/4fb47712-34a6-40d2-8ed3-e153abbd25b7?v=full"
      }
    ],
    "resourceVersion": "1.8"
  },
  "obs": [
    {
      "uuid": "4ef2c716-7c5a-41f4-a282-11d836345860",
      "display": "Poids (kg): 68,2",
      "concept": {
        "uuid": "3ce93b62-26fe-102b-80cb-0017a47871b2",
        "display": "Poids (kg)",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/3ce93b62-26fe-102b-80cb-0017a47871b2"
          }
        ]
      },
      "person": {
        "uuid": "ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac",
        "display": "Y2A25W - TestPatient Dave",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/patient/ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac"
          }
        ]
      },
      "obsDatetime": "2018-03-21T12:01:00.000-0400",
      "accessionNumber": null,
      "obsGroup": null,
      "valueCodedName": null,
      "groupMembers": null,
      "comment": "real_comment",
      "location": {
        "uuid": "199e7d87-92a0-4398-a0f8-11d012178164",
        "display": "Klinik Ekstèn",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164"
          }
        ]
      },
      "order": null,
      "encounter": {
        "uuid": "581837a9-75b4-4233-8456-9635983b5eab",
        "display": "Signes vitaux 21/03/2018",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/581837a9-75b4-4233-8456-9635983b5eab"
          }
        ]
      },
      "voided": false,
      "value": 68.2,
      "valueModifier": null,
      "formFieldPath": null,
      "formFieldNamespace": null,
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/latestobs/4ef2c716-7c5a-41f4-a282-11d836345860"
        },
        {
          "rel": "full",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/latestobs/4ef2c716-7c5a-41f4-a282-11d836345860?v=full"
        }
      ],
      "resourceVersion": "1.11"
    },
    {
      "uuid": "e232be48-973e-42cd-95d3-0c88c03e2d9f",
      "display": "Taille (cm): 182,9",
      "concept": {
        "uuid": "3ce93cf2-26fe-102b-80cb-0017a47871b2",
        "display": "Taille (cm)",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/3ce93cf2-26fe-102b-80cb-0017a47871b2"
          }
        ]
      },
      "person": {
        "uuid": "ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac",
        "display": "Y2A25W - TestPatient Dave",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/patient/ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac"
          }
        ]
      },
      "obsDatetime": "2018-03-21T12:01:00.000-0400",
      "accessionNumber": null,
      "obsGroup": null,
      "valueCodedName": null,
      "groupMembers": null,
      "comment": "form^path",
      "location": {
        "uuid": "199e7d87-92a0-4398-a0f8-11d012178164",
        "display": "Klinik Ekstèn",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/199e7d87-92a0-4398-a0f8-11d012178164"
          }
        ]
      },
      "order": null,
      "encounter": {
        "uuid": "581837a9-75b4-4233-8456-9635983b5eab",
        "display": "Signes vitaux 21/03/2018",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/581837a9-75b4-4233-8456-9635983b5eab"
          }
        ]
      },
      "voided": false,
      "value": 182.9,
      "valueModifier": null,
      "formFieldPath": null,
      "formFieldNamespace": null,
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/latestobs/e232be48-973e-42cd-95d3-0c88c03e2d9f"
        },
        {
          "rel": "full",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/latestobs/e232be48-973e-42cd-95d3-0c88c03e2d9f?v=full"
        }
      ],
      "resourceVersion": "1.11"
    }
  ],
  "orders": [],
  "voided": false,
  "auditInfo": {
    "creator": {
      "uuid": "190932e8-2872-43cf-b645-3804a5752f88",
      "display": "ddesimone",
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/user/190932e8-2872-43cf-b645-3804a5752f88"
        }
      ]
    },
    "dateCreated": "2018-03-21T12:01:00.000-0400",
    "changedBy": null,
    "dateChanged": null
  },
  "visit": {
    "uuid": "28f9e434-ae61-4a1d-928a-c2b41ceba326",
    "display": "Clinic or Hospital Visit @ Hôpital Universitaire de Mirebalais - 21/03/2018 12:00",
    "patient": {
      "uuid": "ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac",
      "display": "Y2A25W - TestPatient Dave",
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/patient/ad92c0a2-d9ad-4fe2-a4f8-6b677c0a3dac"
        }
      ]
    },
    "visitType": {
      "uuid": "f01c54cb-2225-471a-9cd5-d348552c337c",
      "display": "Consultation clinique ou hospitalière",
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/visittype/f01c54cb-2225-471a-9cd5-d348552c337c"
        }
      ]
    },
    "indication": null,
    "location": {
      "uuid": "a084f714-a536-473b-94e6-ec317b152b43",
      "display": "Hôpital Universitaire de Mirebalais",
      "links": [
        {
          "rel": "self",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/location/a084f714-a536-473b-94e6-ec317b152b43"
        }
      ]
    },
    "startDatetime": "2018-03-21T12:00:36.000-0400",
    "stopDatetime": "2018-03-21T12:01:00.000-0400",
    "encounters": [
      {
        "uuid": "581837a9-75b4-4233-8456-9635983b5eab",
        "display": "Signes vitaux 21/03/2018",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/581837a9-75b4-4233-8456-9635983b5eab"
          }
        ]
      },
      {
        "uuid": "3e4e1ec3-8544-4ffa-bd59-930c2ccab430",
        "display": "Inscription 21/03/2018",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/3e4e1ec3-8544-4ffa-bd59-930c2ccab430"
          }
        ]
      }
    ],
    "attributes": [],
    "voided": false,
    "links": [
      {
        "rel": "self",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/visit/28f9e434-ae61-4a1d-928a-c2b41ceba326"
      },
      {
        "rel": "full",
        "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/visit/28f9e434-ae61-4a1d-928a-c2b41ceba326?v=full"
      }
    ],
    "resourceVersion": "1.9"
  },
  "encounterProviders": [
    {
      "uuid": "cd70b756-3a68-47c1-96b0-d03958854b0b",
      "provider": {
        "uuid": "1a247aba-ff99-4a9f-9b19-5adeec5e4e78",
        "display": "MAGWA - David DeSimone",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/provider/1a247aba-ff99-4a9f-9b19-5adeec5e4e78"
          }
        ]
      },
      "encounterRole": {
        "uuid": "98bf2792-3f0a-4388-81bb-c78b29c0df92",
        "display": "Nurse",
        "links": [
          {
            "rel": "self",
            "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounterrole/98bf2792-3f0a-4388-81bb-c78b29c0df92"
          }
        ]
      },
      "voided": false,
      "links": [
        {
          "rel": "full",
          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/581837a9-75b4-4233-8456-9635983b5eab/encounterprovider/cd70b756-3a68-47c1-96b0-d03958854b0b?v=full"
        }
      ],
      "resourceVersion": "1.9"
    }
  ],
  "links": [
    {
      "rel": "self",
      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/581837a9-75b4-4233-8456-9635983b5eab"
    }
  ],
  "resourceVersion": "1.9"
};

const mockStore = configureMockStore();

const encounterForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <EncounterForm {...props} />
      </Provider>
    );
  }
  return mountedComponent;
};

// TODO improve these tests: I haven't figured out yet how to inspect the values passed to
// TODO this.props.initialize(initialData) so I have been running these tests and inspecting manually
// TODO obviously there should be an "expect" here instead

describe("EncounterForm", () => {

  beforeEach(() => {
    store = mockStore({});
    mountedComponent = undefined;
  });


  it("should render correctly without encounter", () => {

    props = {
      formInstanceId: "some_form_id",
      patient: {
        uuid: "some_patient_uuid"
      },
      encounterType: {
        uuid: "some_encounter_type_uuid"
      },
      visit: {
        uuid: "some_visit_uuid"
      }
    };

    expect(encounterForm().find('form').length).toBe(1);
    expect(encounterForm().find(Form).props().onSubmit.length).toBe(1);
  });

  it("should render correctly with encounter", () => {

    props = {
      formInstanceId: "some_form_id",
      patient: {
        uuid: "some_patient_uuid"
      },
      encounterType: {
        uuid: "some_encounter_type_uuid"
      },
      visit: {
        uuid: "some_visit_uuid"
      },
      encounter: encounter
    };

    expect(encounterForm().find('form').length).toBe(1);
    expect(encounterForm().find(Form).props().onSubmit.length).toBe(1);
  });

  it("should render correctly with default values", () => {

    props = {
      formInstanceId: "some_form_id",
      patient: {
        uuid: "some_patient_uuid"
      },
      encounterType: {
        uuid: "some_encounter_type_uuid"
      },
      visit: {
        uuid: "some_visit_uuid"
      },
      encounter: encounter,
      defaultValues: [
        {
          type: "obs",
          path: "some-path",
          concept: "some-concept-uuid",
          value: 100
        }
      ]
    };

    expect(encounterForm().find('form').length).toBe(1);
    expect(encounterForm().find(Form).props().onSubmit.length).toBe(1);
  });

});
