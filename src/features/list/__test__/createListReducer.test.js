import createListReducer from '../createListReducer';
import visitRestRepToPatientObjConverter from '../../../domain/patient/converters/visitRestRepToPatientObjConverter';
import byEncounterTypeFilter from '../../../domain/patient/filters/patientObjByEncounterTypeFilter';
import VISIT_TYPES from "../../visit/types";

describe('createListReducer', () => {

  const sampleVisits = [
    {
      "uuid": "6501cbf1-42f3-4b2f-83bc-ed562e019af8",
      "patient": {
        "uuid": "8f28ffff-c7e8-4e80-990a-e022e014f953",
        "display": "Y2CAGV - Bob Dylan",
        "identifiers": [
          {
            "display": "ZL EMR ID = Y2CAGV",
            "uuid": "5f0eaa88-68f2-4810-859d-dc16160d41b9",
            "identifier": "Y2CAGV",
            "identifierType": {
              "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
              "display": "ID ZL EMR",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": true,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/5f0eaa88-68f2-4810-859d-dc16160d41b9"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/5f0eaa88-68f2-4810-859d-dc16160d41b9?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Nimewo Dosye = TH000001",
            "uuid": "e41fa5cf-5ef1-4882-8c04-ca6a8b1992b9",
            "identifier": "TH000001",
            "identifierType": {
              "uuid": "e66645eb-03a8-4991-b4ce-e87318e37566",
              "display": "Numéro de dossier",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e66645eb-03a8-4991-b4ce-e87318e37566"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/e41fa5cf-5ef1-4882-8c04-ca6a8b1992b9"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/e41fa5cf-5ef1-4882-8c04-ca6a8b1992b9?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "ZL EMR ID = Y2CEU3",
            "uuid": "3f538755-6f7a-45aa-8b0f-ea0554301cf8",
            "identifier": "Y2CEU3",
            "identifierType": {
              "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
              "display": "ID ZL EMR",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/3f538755-6f7a-45aa-8b0f-ea0554301cf8"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/3f538755-6f7a-45aa-8b0f-ea0554301cf8?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Nimewo Dosye = TH000009",
            "uuid": "7ae8216b-95e9-4939-87c3-099ec6123469",
            "identifier": "TH000009",
            "identifierType": {
              "uuid": "e66645eb-03a8-4991-b4ce-e87318e37566",
              "display": "Numéro de dossier",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e66645eb-03a8-4991-b4ce-e87318e37566"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/7ae8216b-95e9-4939-87c3-099ec6123469"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/7ae8216b-95e9-4939-87c3-099ec6123469?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "ZL EMR ID = Y2A4AG",
            "uuid": "473f0706-cdb5-4d6e-a291-eb935a3710b9",
            "identifier": "Y2A4AG",
            "identifierType": {
              "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
              "display": "ID ZL EMR",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/473f0706-cdb5-4d6e-a291-eb935a3710b9"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/473f0706-cdb5-4d6e-a291-eb935a3710b9?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Nimewo Dosye = TH000011",
            "uuid": "7db0be36-c7fa-4706-8e64-39c4f96df00f",
            "identifier": "TH000011",
            "identifierType": {
              "uuid": "e66645eb-03a8-4991-b4ce-e87318e37566",
              "display": "Numéro de dossier",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e66645eb-03a8-4991-b4ce-e87318e37566"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/7db0be36-c7fa-4706-8e64-39c4f96df00f"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/7db0be36-c7fa-4706-8e64-39c4f96df00f?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "HIVEMR-V1 = AA",
            "uuid": "60bccb61-5369-4d1c-a543-3498bd56b111",
            "identifier": "AA",
            "identifierType": {
              "uuid": "139766e8-15f5-102d-96e4-000c29c2a5d7",
              "display": "HIVEMR-V1",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/139766e8-15f5-102d-96e4-000c29c2a5d7"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/60bccb61-5369-4d1c-a543-3498bd56b111"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/60bccb61-5369-4d1c-a543-3498bd56b111?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Numéro d'identité fiscale (NIF) = BBB",
            "uuid": "7647dac5-3a4a-468c-90a0-1e76145e0393",
            "identifier": "BBB",
            "identifierType": {
              "uuid": "e797f826-8e8f-11e7-bb31-be2e44b06b34",
              "display": "Numéro d'identité fiscale (NIF)",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e797f826-8e8f-11e7-bb31-be2e44b06b34"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/7647dac5-3a4a-468c-90a0-1e76145e0393"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/7647dac5-3a4a-468c-90a0-1e76145e0393?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Carte d'identification nationale = BBBB",
            "uuid": "6264c025-d89b-4faa-a6c3-915a27a2ca70",
            "identifier": "BBBB",
            "identifierType": {
              "uuid": "e797face-8e8f-11e7-bb31-be2e44b06b34",
              "display": "Carte d'identification nationale",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e797face-8e8f-11e7-bb31-be2e44b06b34"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/6264c025-d89b-4faa-a6c3-915a27a2ca70"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953/identifier/6264c025-d89b-4faa-a6c3-915a27a2ca70?v=full"
              }
            ],
            "resourceVersion": "1.8"
          }
        ],
        "person": {
          "uuid": "8f28ffff-c7e8-4e80-990a-e022e014f953",
          "display": "Bob Dylan",
          "gender": "M",
          "age": 46,
          "birthdate": "1972-01-01T00:00:00.000-0500",
          "birthdateEstimated": true,
          "dead": false,
          "deathDate": null,
          "causeOfDeath": null,
          "preferredName": {
            "display": "Dylan, Bob",
            "uuid": "11cbfc38-17fc-40b4-aae8-88694be7f517",
            "givenName": "Bob",
            "middleName": null,
            "familyName": "Dylan",
            "familyName2": null,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/11cbfc38-17fc-40b4-aae8-88694be7f517"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/11cbfc38-17fc-40b4-aae8-88694be7f517?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          "preferredAddress": {
            "display": "Cange",
            "uuid": "c10c4cbe-a13a-43cf-aec4-85daead8e5e4",
            "preferred": true,
            "address1": "Cange",
            "address2": null,
            "cityVillage": "Cerca Cavajal",
            "stateProvince": "Centre",
            "country": "Haiti",
            "postalCode": null,
            "countyDistrict": null,
            "address3": "1Ã¨re Rang",
            "address4": null,
            "address5": null,
            "address6": null,
            "startDate": null,
            "endDate": null,
            "latitude": null,
            "longitude": null,
            "voided": false,
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
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/address/c10c4cbe-a13a-43cf-aec4-85daead8e5e4"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/address/c10c4cbe-a13a-43cf-aec4-85daead8e5e4?v=full"
              }
            ],
            "resourceVersion": "2.0"
          },
          "names": [
            {
              "display": "Dylan, Bob",
              "uuid": "11cbfc38-17fc-40b4-aae8-88694be7f517",
              "givenName": "Bob",
              "middleName": null,
              "familyName": "Dylan",
              "familyName2": null,
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/11cbfc38-17fc-40b4-aae8-88694be7f517"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/11cbfc38-17fc-40b4-aae8-88694be7f517?v=full"
                }
              ],
              "resourceVersion": "1.8"
            },
            {
              "display": "Bob, Baby",
              "uuid": "7d30f9bc-64a5-40c5-8921-db0c9b4fda4d",
              "givenName": "Baby",
              "middleName": null,
              "familyName": "Bob",
              "familyName2": null,
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/7d30f9bc-64a5-40c5-8921-db0c9b4fda4d"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/7d30f9bc-64a5-40c5-8921-db0c9b4fda4d?v=full"
                }
              ],
              "resourceVersion": "1.8"
            },
            {
              "display": "test, tset",
              "uuid": "2e024163-b69e-4e9f-b1f2-856441c49461",
              "givenName": "tset",
              "middleName": null,
              "familyName": "test",
              "familyName2": null,
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/2e024163-b69e-4e9f-b1f2-856441c49461"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/name/2e024163-b69e-4e9f-b1f2-856441c49461?v=full"
                }
              ],
              "resourceVersion": "1.8"
            }
          ],
          "addresses": [
            {
              "display": "Cange",
              "uuid": "c10c4cbe-a13a-43cf-aec4-85daead8e5e4",
              "preferred": true,
              "address1": "Cange",
              "address2": null,
              "cityVillage": "Cerca Cavajal",
              "stateProvince": "Centre",
              "country": "Haiti",
              "postalCode": null,
              "countyDistrict": null,
              "address3": "1Ã¨re Rang",
              "address4": null,
              "address5": null,
              "address6": null,
              "startDate": null,
              "endDate": null,
              "latitude": null,
              "longitude": null,
              "voided": false,
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
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/address/c10c4cbe-a13a-43cf-aec4-85daead8e5e4"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/address/c10c4cbe-a13a-43cf-aec4-85daead8e5e4?v=full"
                }
              ],
              "resourceVersion": "2.0"
            },
            {
              "display": "Cange",
              "uuid": "c5571541-c0fb-4e86-bc29-a7b71a2d5864",
              "preferred": false,
              "address1": "Cange",
              "address2": null,
              "cityVillage": "Cerca Cavajal",
              "stateProvince": "Centre",
              "country": "Haiti",
              "postalCode": null,
              "countyDistrict": null,
              "address3": "1ère Rang",
              "address4": null,
              "address5": null,
              "address6": null,
              "startDate": null,
              "endDate": null,
              "latitude": null,
              "longitude": null,
              "voided": false,
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
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/address/c5571541-c0fb-4e86-bc29-a7b71a2d5864"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/address/c5571541-c0fb-4e86-bc29-a7b71a2d5864?v=full"
                }
              ],
              "resourceVersion": "2.0"
            }
          ],
          "attributes": [
            {
              "display": "First Name of Mother = test",
              "uuid": "1913c276-5219-44bf-8d01-02f821658524",
              "value": "test",
              "attributeType": {
                "uuid": "8d871d18-c2cc-11de-8d13-0010c6dffd0f",
                "display": "Mother's First Name",
                "links": [
                  {
                    "rel": "self",
                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/personattributetype/8d871d18-c2cc-11de-8d13-0010c6dffd0f"
                  }
                ]
              },
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/attribute/1913c276-5219-44bf-8d01-02f821658524"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/attribute/1913c276-5219-44bf-8d01-02f821658524?v=full"
                }
              ],
              "resourceVersion": "1.8"
            },
            {
              "display": "Telephone Number = 232",
              "uuid": "8974e0dd-49b3-486a-81ac-1b68fd3447e5",
              "value": "232",
              "attributeType": {
                "uuid": "14d4f066-15f5-102d-96e4-000c29c2a5d7",
                "display": "Numéro de téléphone",
                "links": [
                  {
                    "rel": "self",
                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/personattributetype/14d4f066-15f5-102d-96e4-000c29c2a5d7"
                  }
                ]
              },
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/attribute/8974e0dd-49b3-486a-81ac-1b68fd3447e5"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953/attribute/8974e0dd-49b3-486a-81ac-1b68fd3447e5?v=full"
                }
              ],
              "resourceVersion": "1.8"
            }
          ],
          "voided": false,
          "auditInfo": {
            "creator": {
              "uuid": "3a3482ac-8880-40f0-adda-81b2cff19b78",
              "display": "manager",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/3a3482ac-8880-40f0-adda-81b2cff19b78"
                }
              ]
            },
            "dateCreated": "2016-08-15T17:28:39.000-0400",
            "changedBy": {
              "uuid": "28a60719-097d-4ddf-a803-7575cbe6f865",
              "display": "mgoodrich",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/28a60719-097d-4ddf-a803-7575cbe6f865"
                }
              ]
            },
            "dateChanged": "2017-09-26T13:17:02.000-0400"
          },
          "deathdateEstimated": false,
          "birthtime": null,
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/8f28ffff-c7e8-4e80-990a-e022e014f953"
            }
          ],
          "resourceVersion": "1.11"
        },
        "voided": false,
        "auditInfo": {
          "creator": {
            "uuid": "3a3482ac-8880-40f0-adda-81b2cff19b78",
            "display": "manager",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/3a3482ac-8880-40f0-adda-81b2cff19b78"
              }
            ]
          },
          "dateCreated": "2016-08-15T17:28:39.000-0400",
          "changedBy": {
            "uuid": "28a60719-097d-4ddf-a803-7575cbe6f865",
            "display": "mgoodrich",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/28a60719-097d-4ddf-a803-7575cbe6f865"
              }
            ]
          },
          "dateChanged": "2017-09-26T13:17:02.000-0400"
        },
        "links": [
          {
            "rel": "self",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/8f28ffff-c7e8-4e80-990a-e022e014f953"
          }
        ],
        "resourceVersion": "1.8"
      },
      "encounters": []
    },
    {
      "uuid": "e81fe098-5b7f-4085-bc76-39918c8df2f6",
      "patient": {
        "uuid": "cda61f89-c342-4caf-88c3-d0f829a7b43a",
        "display": "Y2A5H1 - Neil Young",
        "identifiers": [
          {
            "display": "ZL EMR ID = Y2A5H1",
            "uuid": "51992797-39df-4f73-8f03-45f908e18927",
            "identifier": "Y2A5H1",
            "identifierType": {
              "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
              "display": "ID ZL EMR",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": true,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/51992797-39df-4f73-8f03-45f908e18927"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/51992797-39df-4f73-8f03-45f908e18927?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Nimewo Dosye = TH000002",
            "uuid": "4bfb79ad-8735-4c0a-b86b-24a0844842b1",
            "identifier": "TH000002",
            "identifierType": {
              "uuid": "e66645eb-03a8-4991-b4ce-e87318e37566",
              "display": "Numéro de dossier",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e66645eb-03a8-4991-b4ce-e87318e37566"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4bfb79ad-8735-4c0a-b86b-24a0844842b1"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4bfb79ad-8735-4c0a-b86b-24a0844842b1?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "ZL EMR ID = Y2A8D7",
            "uuid": "2afce7d2-7b84-4bfb-97df-09272d545878",
            "identifier": "Y2A8D7",
            "identifierType": {
              "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
              "display": "ID ZL EMR",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/2afce7d2-7b84-4bfb-97df-09272d545878"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/2afce7d2-7b84-4bfb-97df-09272d545878?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Nimewo Dosye = TH000013",
            "uuid": "eafc1afa-17e2-42d7-adeb-d22f0f606c5b",
            "identifier": "TH000013",
            "identifierType": {
              "uuid": "e66645eb-03a8-4991-b4ce-e87318e37566",
              "display": "Numéro de dossier",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e66645eb-03a8-4991-b4ce-e87318e37566"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/eafc1afa-17e2-42d7-adeb-d22f0f606c5b"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/eafc1afa-17e2-42d7-adeb-d22f0f606c5b?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Numéro d'identité fiscale (NIF) = 3",
            "uuid": "fcdb2bc1-1535-44bb-8fa0-4b69ec77a752",
            "identifier": "3",
            "identifierType": {
              "uuid": "e797f826-8e8f-11e7-bb31-be2e44b06b34",
              "display": "Numéro d'identité fiscale (NIF)",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e797f826-8e8f-11e7-bb31-be2e44b06b34"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/fcdb2bc1-1535-44bb-8fa0-4b69ec77a752"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/fcdb2bc1-1535-44bb-8fa0-4b69ec77a752?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Carte d'identification nationale = 2",
            "uuid": "7e30a11d-abc0-4088-aed8-125a7bc2485b",
            "identifier": "2",
            "identifierType": {
              "uuid": "e797face-8e8f-11e7-bb31-be2e44b06b34",
              "display": "Carte d'identification nationale",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e797face-8e8f-11e7-bb31-be2e44b06b34"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/7e30a11d-abc0-4088-aed8-125a7bc2485b"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/7e30a11d-abc0-4088-aed8-125a7bc2485b?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "HIVEMR-V1 = A",
            "uuid": "4302fb7f-febc-4190-8954-276c5b79ee3a",
            "identifier": "A",
            "identifierType": {
              "uuid": "139766e8-15f5-102d-96e4-000c29c2a5d7",
              "display": "HIVEMR-V1",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/139766e8-15f5-102d-96e4-000c29c2a5d7"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4302fb7f-febc-4190-8954-276c5b79ee3a"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4302fb7f-febc-4190-8954-276c5b79ee3a?v=full"
              }
            ],
            "resourceVersion": "1.8"
          }
        ],
        "person": {
          "uuid": "cda61f89-c342-4caf-88c3-d0f829a7b43a",
          "display": "Neil Young",
          "gender": "M",
          "age": 14,
          "birthdate": "1994-01-01T00:00:00.000-0500",
          "birthdateEstimated": true,
          "dead": false,
          "deathDate": null,
          "causeOfDeath": null,
          "preferredName": {
            "display": "Young, Neil",
            "uuid": "23aba271-277d-4c16-9b11-db45488cc65a",
            "givenName": "Neil",
            "middleName": null,
            "familyName": "Young",
            "familyName2": null,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          "preferredAddress": {
            "display": "Cange",
            "uuid": "846726d6-52b2-4351-b296-3ce8b2eff6aa",
            "preferred": true,
            "address1": "Cange",
            "address2": null,
            "cityVillage": "Cerca Cavajal",
            "stateProvince": "Centre",
            "country": "Haiti",
            "postalCode": null,
            "countyDistrict": null,
            "address3": "1Ã¨re Rang",
            "address4": null,
            "address5": null,
            "address6": null,
            "startDate": null,
            "endDate": null,
            "latitude": null,
            "longitude": null,
            "voided": false,
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
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa?v=full"
              }
            ],
            "resourceVersion": "2.0"
          },
          "names": [
            {
              "display": "Young, Neil",
              "uuid": "23aba271-277d-4c16-9b11-db45488cc65a",
              "givenName": "Neil",
              "middleName": null,
              "familyName": "Young",
              "familyName2": null,
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a?v=full"
                }
              ],
              "resourceVersion": "1.8"
            },
            {
              "display": "Bob, Dylan",
              "uuid": "32f11125-83e2-4d3a-bb4d-12fadcad31c6",
              "givenName": "Dylan",
              "middleName": null,
              "familyName": "Bob",
              "familyName2": null,
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/32f11125-83e2-4d3a-bb4d-12fadcad31c6"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/32f11125-83e2-4d3a-bb4d-12fadcad31c6?v=full"
                }
              ],
              "resourceVersion": "1.8"
            }
          ],
          "addresses": [
            {
              "display": "Cange",
              "uuid": "846726d6-52b2-4351-b296-3ce8b2eff6aa",
              "preferred": true,
              "address1": "Cange",
              "address2": null,
              "cityVillage": "Cerca Cavajal",
              "stateProvince": "Centre",
              "country": "Haiti",
              "postalCode": null,
              "countyDistrict": null,
              "address3": "1Ã¨re Rang",
              "address4": null,
              "address5": null,
              "address6": null,
              "startDate": null,
              "endDate": null,
              "latitude": null,
              "longitude": null,
              "voided": false,
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
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa?v=full"
                }
              ],
              "resourceVersion": "2.0"
            },
            {
              "display": "Cange",
              "uuid": "3bfb2eda-90e8-4ebf-baac-96fbd42af492",
              "preferred": false,
              "address1": "Cange",
              "address2": null,
              "cityVillage": "Cerca Cavajal",
              "stateProvince": "Centre",
              "country": "Haiti",
              "postalCode": null,
              "countyDistrict": null,
              "address3": "1ère Rang",
              "address4": null,
              "address5": null,
              "address6": null,
              "startDate": null,
              "endDate": null,
              "latitude": null,
              "longitude": null,
              "voided": false,
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
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/3bfb2eda-90e8-4ebf-baac-96fbd42af492"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/3bfb2eda-90e8-4ebf-baac-96fbd42af492?v=full"
                }
              ],
              "resourceVersion": "2.0"
            }
          ],
          "attributes": [
            {
              "display": "First Name of Mother = test",
              "uuid": "19155a95-5085-49d8-aa29-6a80f63a54fc",
              "value": "test",
              "attributeType": {
                "uuid": "8d871d18-c2cc-11de-8d13-0010c6dffd0f",
                "display": "Mother's First Name",
                "links": [
                  {
                    "rel": "self",
                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/personattributetype/8d871d18-c2cc-11de-8d13-0010c6dffd0f"
                  }
                ]
              },
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/19155a95-5085-49d8-aa29-6a80f63a54fc"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/19155a95-5085-49d8-aa29-6a80f63a54fc?v=full"
                }
              ],
              "resourceVersion": "1.8"
            },
            {
              "display": "Telephone Number = 23",
              "uuid": "f02c681f-3229-4fb2-986f-f37084f07634",
              "value": "23",
              "attributeType": {
                "uuid": "14d4f066-15f5-102d-96e4-000c29c2a5d7",
                "display": "Numéro de téléphone",
                "links": [
                  {
                    "rel": "self",
                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/personattributetype/14d4f066-15f5-102d-96e4-000c29c2a5d7"
                  }
                ]
              },
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/f02c681f-3229-4fb2-986f-f37084f07634"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/f02c681f-3229-4fb2-986f-f37084f07634?v=full"
                }
              ],
              "resourceVersion": "1.8"
            }
          ],
          "voided": false,
          "auditInfo": {
            "creator": {
              "uuid": "3a3482ac-8880-40f0-adda-81b2cff19b78",
              "display": "manager",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/3a3482ac-8880-40f0-adda-81b2cff19b78"
                }
              ]
            },
            "dateCreated": "2016-08-16T13:30:24.000-0400",
            "changedBy": {
              "uuid": "28a60719-097d-4ddf-a803-7575cbe6f865",
              "display": "mgoodrich",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/28a60719-097d-4ddf-a803-7575cbe6f865"
                }
              ]
            },
            "dateChanged": "2017-09-26T13:17:28.000-0400"
          },
          "deathdateEstimated": false,
          "birthtime": null,
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a"
            }
          ],
          "resourceVersion": "1.11"
        },
        "voided": false,
        "auditInfo": {
          "creator": {
            "uuid": "3a3482ac-8880-40f0-adda-81b2cff19b78",
            "display": "manager",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/3a3482ac-8880-40f0-adda-81b2cff19b78"
              }
            ]
          },
          "dateCreated": "2016-08-16T13:30:24.000-0400",
          "changedBy": {
            "uuid": "28a60719-097d-4ddf-a803-7575cbe6f865",
            "display": "mgoodrich",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/28a60719-097d-4ddf-a803-7575cbe6f865"
              }
            ]
          },
          "dateChanged": "2017-09-26T13:17:28.000-0400"
        },
        "links": [
          {
            "rel": "self",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a"
          }
        ],
        "resourceVersion": "1.8"
      },
      "encounters": [
        {
          "uuid": "0e44fde2-759b-461e-9dfd-cb29997a4554",
          "display": "Signes vitaux 26/06/2018",
          "encounterDatetime": "2018-06-26T15:12:27.000-0400",
          "patient": {
            "uuid": "cda61f89-c342-4caf-88c3-d0f829a7b43a",
            "display": "Y2A5H1 - Neil Young",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a"
              }
            ]
          },
          "location": {
            "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
            "display": "Centre de Santé de Thomonde",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
              }
            ]
          },
          "form": {
            "uuid": "68728aa6-4985-11e2-8815-657001b58a90",
            "display": "Signes vitaux",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/form/68728aa6-4985-11e2-8815-657001b58a90"
              }
            ]
          },
          "encounterType": {
            "uuid": "4fb47712-34a6-40d2-8ed3-e153abbd25b7",
            "display": "Signes vitaux",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/4fb47712-34a6-40d2-8ed3-e153abbd25b7"
              }
            ]
          },
          "obs": [
            {
              "uuid": "9740c0c9-3cbf-4fd6-ba60-6c85daec9e90",
              "display": "Taille (cm): 127,0",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/9740c0c9-3cbf-4fd6-ba60-6c85daec9e90"
                }
              ]
            },
            {
              "uuid": "1a892234-b120-4371-b080-3343c90c9c10",
              "display": "Poids (kg): 45,5",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/1a892234-b120-4371-b080-3343c90c9c10"
                }
              ]
            }
          ],
          "orders": [],
          "voided": false,
          "visit": {
            "uuid": "e81fe098-5b7f-4085-bc76-39918c8df2f6",
            "display": "Clinic or Hospital Visit @ Centre de Santé de Thomonde - 26/06/2018 13:11",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/e81fe098-5b7f-4085-bc76-39918c8df2f6"
              }
            ]
          },
          "encounterProviders": [
            {
              "uuid": "2deaccd1-cc38-41a3-8a82-2011d95625e7",
              "display": "Mark Goodrich: Nurse",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/0e44fde2-759b-461e-9dfd-cb29997a4554/encounterprovider/2deaccd1-cc38-41a3-8a82-2011d95625e7"
                }
              ]
            }
          ],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/0e44fde2-759b-461e-9dfd-cb29997a4554"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/0e44fde2-759b-461e-9dfd-cb29997a4554?v=full"
            }
          ],
          "resourceVersion": "1.9"
        }
      ]
    }
  ];


  const sampleVisitWithVoidedEncounter = [

    {
      "uuid": "e81fe098-5b7f-4085-bc76-39918c8df2f6",
      "patient": {
        "uuid": "cda61f89-c342-4caf-88c3-d0f829a7b43a",
        "display": "Y2A5H1 - Neil Young",
        "identifiers": [
          {
            "display": "ZL EMR ID = Y2A5H1",
            "uuid": "51992797-39df-4f73-8f03-45f908e18927",
            "identifier": "Y2A5H1",
            "identifierType": {
              "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
              "display": "ID ZL EMR",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": true,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/51992797-39df-4f73-8f03-45f908e18927"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/51992797-39df-4f73-8f03-45f908e18927?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Nimewo Dosye = TH000002",
            "uuid": "4bfb79ad-8735-4c0a-b86b-24a0844842b1",
            "identifier": "TH000002",
            "identifierType": {
              "uuid": "e66645eb-03a8-4991-b4ce-e87318e37566",
              "display": "Numéro de dossier",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e66645eb-03a8-4991-b4ce-e87318e37566"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4bfb79ad-8735-4c0a-b86b-24a0844842b1"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4bfb79ad-8735-4c0a-b86b-24a0844842b1?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "ZL EMR ID = Y2A8D7",
            "uuid": "2afce7d2-7b84-4bfb-97df-09272d545878",
            "identifier": "Y2A8D7",
            "identifierType": {
              "uuid": "a541af1e-105c-40bf-b345-ba1fd6a59b85",
              "display": "ID ZL EMR",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/a541af1e-105c-40bf-b345-ba1fd6a59b85"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/2afce7d2-7b84-4bfb-97df-09272d545878"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/2afce7d2-7b84-4bfb-97df-09272d545878?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Nimewo Dosye = TH000013",
            "uuid": "eafc1afa-17e2-42d7-adeb-d22f0f606c5b",
            "identifier": "TH000013",
            "identifierType": {
              "uuid": "e66645eb-03a8-4991-b4ce-e87318e37566",
              "display": "Numéro de dossier",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e66645eb-03a8-4991-b4ce-e87318e37566"
                }
              ]
            },
            "location": {
              "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
              "display": "Centre de Santé de Thomonde",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
                }
              ]
            },
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/eafc1afa-17e2-42d7-adeb-d22f0f606c5b"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/eafc1afa-17e2-42d7-adeb-d22f0f606c5b?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Numéro d'identité fiscale (NIF) = 3",
            "uuid": "fcdb2bc1-1535-44bb-8fa0-4b69ec77a752",
            "identifier": "3",
            "identifierType": {
              "uuid": "e797f826-8e8f-11e7-bb31-be2e44b06b34",
              "display": "Numéro d'identité fiscale (NIF)",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e797f826-8e8f-11e7-bb31-be2e44b06b34"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/fcdb2bc1-1535-44bb-8fa0-4b69ec77a752"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/fcdb2bc1-1535-44bb-8fa0-4b69ec77a752?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "Carte d'identification nationale = 2",
            "uuid": "7e30a11d-abc0-4088-aed8-125a7bc2485b",
            "identifier": "2",
            "identifierType": {
              "uuid": "e797face-8e8f-11e7-bb31-be2e44b06b34",
              "display": "Carte d'identification nationale",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/e797face-8e8f-11e7-bb31-be2e44b06b34"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/7e30a11d-abc0-4088-aed8-125a7bc2485b"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/7e30a11d-abc0-4088-aed8-125a7bc2485b?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          {
            "display": "HIVEMR-V1 = A",
            "uuid": "4302fb7f-febc-4190-8954-276c5b79ee3a",
            "identifier": "A",
            "identifierType": {
              "uuid": "139766e8-15f5-102d-96e4-000c29c2a5d7",
              "display": "HIVEMR-V1",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/patientidentifiertype/139766e8-15f5-102d-96e4-000c29c2a5d7"
                }
              ]
            },
            "location": null,
            "preferred": false,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4302fb7f-febc-4190-8954-276c5b79ee3a"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a/identifier/4302fb7f-febc-4190-8954-276c5b79ee3a?v=full"
              }
            ],
            "resourceVersion": "1.8"
          }
        ],
        "person": {
          "uuid": "cda61f89-c342-4caf-88c3-d0f829a7b43a",
          "display": "Neil Young",
          "gender": "M",
          "age": 14,
          "birthdate": "1994-01-01T00:00:00.000-0500",
          "birthdateEstimated": true,
          "dead": false,
          "deathDate": null,
          "causeOfDeath": null,
          "preferredName": {
            "display": "Young, Neil",
            "uuid": "23aba271-277d-4c16-9b11-db45488cc65a",
            "givenName": "Neil",
            "middleName": null,
            "familyName": "Young",
            "familyName2": null,
            "voided": false,
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a?v=full"
              }
            ],
            "resourceVersion": "1.8"
          },
          "preferredAddress": {
            "display": "Cange",
            "uuid": "846726d6-52b2-4351-b296-3ce8b2eff6aa",
            "preferred": true,
            "address1": "Cange",
            "address2": null,
            "cityVillage": "Cerca Cavajal",
            "stateProvince": "Centre",
            "country": "Haiti",
            "postalCode": null,
            "countyDistrict": null,
            "address3": "1Ã¨re Rang",
            "address4": null,
            "address5": null,
            "address6": null,
            "startDate": null,
            "endDate": null,
            "latitude": null,
            "longitude": null,
            "voided": false,
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
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa"
              },
              {
                "rel": "full",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa?v=full"
              }
            ],
            "resourceVersion": "2.0"
          },
          "names": [
            {
              "display": "Young, Neil",
              "uuid": "23aba271-277d-4c16-9b11-db45488cc65a",
              "givenName": "Neil",
              "middleName": null,
              "familyName": "Young",
              "familyName2": null,
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/23aba271-277d-4c16-9b11-db45488cc65a?v=full"
                }
              ],
              "resourceVersion": "1.8"
            },
            {
              "display": "Bob, Dylan",
              "uuid": "32f11125-83e2-4d3a-bb4d-12fadcad31c6",
              "givenName": "Dylan",
              "middleName": null,
              "familyName": "Bob",
              "familyName2": null,
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/32f11125-83e2-4d3a-bb4d-12fadcad31c6"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/name/32f11125-83e2-4d3a-bb4d-12fadcad31c6?v=full"
                }
              ],
              "resourceVersion": "1.8"
            }
          ],
          "addresses": [
            {
              "display": "Cange",
              "uuid": "846726d6-52b2-4351-b296-3ce8b2eff6aa",
              "preferred": true,
              "address1": "Cange",
              "address2": null,
              "cityVillage": "Cerca Cavajal",
              "stateProvince": "Centre",
              "country": "Haiti",
              "postalCode": null,
              "countyDistrict": null,
              "address3": "1Ã¨re Rang",
              "address4": null,
              "address5": null,
              "address6": null,
              "startDate": null,
              "endDate": null,
              "latitude": null,
              "longitude": null,
              "voided": false,
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
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/846726d6-52b2-4351-b296-3ce8b2eff6aa?v=full"
                }
              ],
              "resourceVersion": "2.0"
            },
            {
              "display": "Cange",
              "uuid": "3bfb2eda-90e8-4ebf-baac-96fbd42af492",
              "preferred": false,
              "address1": "Cange",
              "address2": null,
              "cityVillage": "Cerca Cavajal",
              "stateProvince": "Centre",
              "country": "Haiti",
              "postalCode": null,
              "countyDistrict": null,
              "address3": "1ère Rang",
              "address4": null,
              "address5": null,
              "address6": null,
              "startDate": null,
              "endDate": null,
              "latitude": null,
              "longitude": null,
              "voided": false,
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
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/3bfb2eda-90e8-4ebf-baac-96fbd42af492"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/address/3bfb2eda-90e8-4ebf-baac-96fbd42af492?v=full"
                }
              ],
              "resourceVersion": "2.0"
            }
          ],
          "attributes": [
            {
              "display": "First Name of Mother = test",
              "uuid": "19155a95-5085-49d8-aa29-6a80f63a54fc",
              "value": "test",
              "attributeType": {
                "uuid": "8d871d18-c2cc-11de-8d13-0010c6dffd0f",
                "display": "Mother's First Name",
                "links": [
                  {
                    "rel": "self",
                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/personattributetype/8d871d18-c2cc-11de-8d13-0010c6dffd0f"
                  }
                ]
              },
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/19155a95-5085-49d8-aa29-6a80f63a54fc"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/19155a95-5085-49d8-aa29-6a80f63a54fc?v=full"
                }
              ],
              "resourceVersion": "1.8"
            },
            {
              "display": "Telephone Number = 23",
              "uuid": "f02c681f-3229-4fb2-986f-f37084f07634",
              "value": "23",
              "attributeType": {
                "uuid": "14d4f066-15f5-102d-96e4-000c29c2a5d7",
                "display": "Numéro de téléphone",
                "links": [
                  {
                    "rel": "self",
                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/personattributetype/14d4f066-15f5-102d-96e4-000c29c2a5d7"
                  }
                ]
              },
              "voided": false,
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/f02c681f-3229-4fb2-986f-f37084f07634"
                },
                {
                  "rel": "full",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a/attribute/f02c681f-3229-4fb2-986f-f37084f07634?v=full"
                }
              ],
              "resourceVersion": "1.8"
            }
          ],
          "voided": false,
          "auditInfo": {
            "creator": {
              "uuid": "3a3482ac-8880-40f0-adda-81b2cff19b78",
              "display": "manager",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/3a3482ac-8880-40f0-adda-81b2cff19b78"
                }
              ]
            },
            "dateCreated": "2016-08-16T13:30:24.000-0400",
            "changedBy": {
              "uuid": "28a60719-097d-4ddf-a803-7575cbe6f865",
              "display": "mgoodrich",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/28a60719-097d-4ddf-a803-7575cbe6f865"
                }
              ]
            },
            "dateChanged": "2017-09-26T13:17:28.000-0400"
          },
          "deathdateEstimated": false,
          "birthtime": null,
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/cda61f89-c342-4caf-88c3-d0f829a7b43a"
            }
          ],
          "resourceVersion": "1.11"
        },
        "voided": false,
        "auditInfo": {
          "creator": {
            "uuid": "3a3482ac-8880-40f0-adda-81b2cff19b78",
            "display": "manager",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/3a3482ac-8880-40f0-adda-81b2cff19b78"
              }
            ]
          },
          "dateCreated": "2016-08-16T13:30:24.000-0400",
          "changedBy": {
            "uuid": "28a60719-097d-4ddf-a803-7575cbe6f865",
            "display": "mgoodrich",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/28a60719-097d-4ddf-a803-7575cbe6f865"
              }
            ]
          },
          "dateChanged": "2017-09-26T13:17:28.000-0400"
        },
        "links": [
          {
            "rel": "self",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a"
          }
        ],
        "resourceVersion": "1.8"
      },
      "encounters": [
        {
          "uuid": "0e44fde2-759b-461e-9dfd-cb29997a4554",
          "display": "Signes vitaux 26/06/2018",
          "encounterDatetime": "2018-06-26T15:12:27.000-0400",
          "patient": {
            "uuid": "cda61f89-c342-4caf-88c3-d0f829a7b43a",
            "display": "Y2A5H1 - Neil Young",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/cda61f89-c342-4caf-88c3-d0f829a7b43a"
              }
            ]
          },
          "location": {
            "uuid": "376b3e7e-f7c0-4268-a98d-c2bddfee8bcf",
            "display": "Centre de Santé de Thomonde",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/location/376b3e7e-f7c0-4268-a98d-c2bddfee8bcf"
              }
            ]
          },
          "form": {
            "uuid": "68728aa6-4985-11e2-8815-657001b58a90",
            "display": "Signes vitaux",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/form/68728aa6-4985-11e2-8815-657001b58a90"
              }
            ]
          },
          "encounterType": {
            "uuid": "4fb47712-34a6-40d2-8ed3-e153abbd25b7",
            "display": "Signes vitaux",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/encountertype/4fb47712-34a6-40d2-8ed3-e153abbd25b7"
              }
            ]
          },
          "obs": [
            {
              "uuid": "9740c0c9-3cbf-4fd6-ba60-6c85daec9e90",
              "display": "Taille (cm): 127,0",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/9740c0c9-3cbf-4fd6-ba60-6c85daec9e90"
                }
              ]
            },
            {
              "uuid": "1a892234-b120-4371-b080-3343c90c9c10",
              "display": "Poids (kg): 45,5",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/obs/1a892234-b120-4371-b080-3343c90c9c10"
                }
              ]
            }
          ],
          "orders": [],
          "voided": true,
          "visit": {
            "uuid": "e81fe098-5b7f-4085-bc76-39918c8df2f6",
            "display": "Clinic or Hospital Visit @ Centre de Santé de Thomonde - 26/06/2018 13:11",
            "links": [
              {
                "rel": "self",
                "uri": "http://localhost:8080/openmrs/ws/rest/v1/visit/e81fe098-5b7f-4085-bc76-39918c8df2f6"
              }
            ]
          },
          "encounterProviders": [
            {
              "uuid": "2deaccd1-cc38-41a3-8a82-2011d95625e7",
              "display": "Mark Goodrich: Nurse",
              "links": [
                {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/0e44fde2-759b-461e-9dfd-cb29997a4554/encounterprovider/2deaccd1-cc38-41a3-8a82-2011d95625e7"
                }
              ]
            }
          ],
          "links": [
            {
              "rel": "self",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/0e44fde2-759b-461e-9dfd-cb29997a4554"
            },
            {
              "rel": "full",
              "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/0e44fde2-759b-461e-9dfd-cb29997a4554?v=full"
            }
          ],
          "resourceVersion": "1.9"
        }
      ]
    }
  ];


  it('should return the initial state', () => {
    const reducer = createListReducer();
    expect(reducer(undefined, [])).toEqual([]);
  });

  it('should return all patients if encounter type not specified', () => {

    const reducer = createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      'visits',
      [visitRestRepToPatientObjConverter()]);

    const queue = reducer([], {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: sampleVisits
    });

    expect(queue.length).toBe(2);
    expect(queue[0].getName().givenName).toBe("Bob");
    expect(queue[0].getName().familyName).toBe("Dylan");
    expect(queue[0].visit.uuid).toBe("6501cbf1-42f3-4b2f-83bc-ed562e019af8");
    expect(queue[1].getName().givenName).toBe("Neil");
    expect(queue[1].getName().familyName).toBe("Young");
    expect(queue[1].visit.uuid).toBe("e81fe098-5b7f-4085-bc76-39918c8df2f6");

  });

  it('should exclude patients who already have encounter of certain type', () => {

    const reducer = createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      'visits',
      [visitRestRepToPatientObjConverter()],
      [byEncounterTypeFilter('4fb47712-34a6-40d2-8ed3-e153abbd25b7', 'exclude')]);

    const queue = reducer([], {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: sampleVisits
    });

    expect(queue.length).toBe(1);
    expect(queue[0].getName().givenName).toBe("Bob");
    expect(queue[0].getName().familyName).toBe("Dylan");
    expect(queue[0].visit.uuid).toBe("6501cbf1-42f3-4b2f-83bc-ed562e019af8");

  });

  it('should not include voided encounters when determined patients to exclude', () => {

    const reducer = createListReducer(VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      'visits',
      [visitRestRepToPatientObjConverter()],
      [byEncounterTypeFilter('4fb47712-34a6-40d2-8ed3-e153abbd25b7', 'exclude')]);

    const queue = reducer([], {
      type:VISIT_TYPES.ACTIVE_VISITS.FETCH_SUCCEEDED,
      visits: sampleVisitWithVoidedEncounter    // this second sample data set has just Neil Young with a voided vitals encounter
    });

    expect(queue.length).toBe(1);
    expect(queue[0].getName().givenName).toBe("Neil");
    expect(queue[0].getName().familyName).toBe("Young");
    expect(queue[0].visit.uuid).toBe("e81fe098-5b7f-4085-bc76-39918c8df2f6");

  });


});
