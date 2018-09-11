import patientUtil from '../patient/patientUtil';
import {ATTRIBUTE_TYPES} from '../patient/constants';

describe('Domain Object: Patient', () => {

  let patientFullRep, patientSimplifiedRep, patient1, identifier1, identifier2, identifier3, identifierType1, identifierType2,
    identifierType3;

  beforeEach(() => {

    patientFullRep = {
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
        "age": 24,
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
          "postalCode": "code",
          "countyDistrict": "county",
          "address3": "Rang",
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
    };

    patientSimplifiedRep = {
      "patientId": 4,
      "uuid": "a46864ac-4cee-4e3a-a920-7b5799f1dc9a",
      "patientIdentifier": { "uuid": "df3309c3-012f-47ad-b372-15c4f78563ec", "identifier": "Y2A73V" },
      "person": {
        "gender": "M",
        "age": 22,
        "birthdate": "1996-01-01T00:00:00.000-0500",
        "birthdateEstimated": true,
        "personName": {
          "display": "Dylan, Bob",
          "uuid": "0f985ec6-5698-463e-a5a8-bbd19f3e01e1",
          "givenName": "Bob",
          "middleName": null,
          "familyName": "Dylan",
          "familyName2": null,
          "voided": false,
          "links": [{
            "rel": "self",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/name/0f985ec6-5698-463e-a5a8-bbd19f3e01e1"
          }, {
            "rel": "full",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/name/0f985ec6-5698-463e-a5a8-bbd19f3e01e1?v=full"
          }],
          "resourceVersion": "1.8"
        },
        "preferredAddress": {
          "display": "Cange",
          "uuid": "cd5e6826-7820-4ad8-8f30-e7ab5392e876",
          "preferred": true,
          "address1": "Cange",
          "address2": null,
          "cityVillage": "Boucan Carré",
          "stateProvince": "Centre",
          "country": "Haiti",
          "postalCode": null,
          "countyDistrict": null,
          "address3": "3ème des Bayes",
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
          "links": [{
            "rel": "self",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/address/cd5e6826-7820-4ad8-8f30-e7ab5392e876"
          }, {
            "rel": "full",
            "uri": "http://localhost:8080/openmrs/ws/rest/v1/person/a46864ac-4cee-4e3a-a920-7b5799f1dc9a/address/cd5e6826-7820-4ad8-8f30-e7ab5392e876?v=full"
          }],
          "resourceVersion": "2.0"
        }
      },
      "attributes": [{ "value": "test", "attributeType": { "name": "First Name of Mother" } }]
    };

    patient1 =
      {
        _openmrsClass: "Patient",
        id: '1',
        uuid: 'A1',
        gender: 'M',
        age: 24,
        birthdate: '1994-01-01T00:00:00.000-0500',
        name: {
          givenName: 'givenName',
          middleName: 'middleName',
          familyName: 'familyName',
        },
        address: {
          display: 'addressDisplay',
          cityVillage: 'addressCityVillage',
          stateProvince: 'addressStateProvince',
          country: 'addressCountry',
          postalCode: 'addressPostalCode'
        },
        identifiers: [
          {
            identifier: 'identifier',
            identifierType: {
              uuid: 'identifierTypeUuid'
            }
          }
        ],
        attributes: [
          {
            display: '9176-7635',
            uuid: 'B1',
            value: '91767645',
            attributeType: {
              uuid: '14d4f066-15f5-102d-96e4-000c29c2a5d7'
            }
          }
        ],
        // TODO The following are implementation specific things which will be refactored and removed
        actions: 'actions',
        alert: 'alert',
        chw: 'chw',
        village: 'village'
      };

    identifier1 = "123";
    identifierType1 = { uuid: "A2" };

    identifier2 = "456";
    identifierType2 = { uuid: "A3" };

    identifier3 = "789";
    identifierType3 = { uuid: "A3" };

  });

  it('should create patient from full REST rep', () => {

    const patient = patientUtil.createFromRestRep(patientFullRep);

    expect(patient._openmrsClass).toBe("Patient");
    expect(patient.uuid).toBe("cda61f89-c342-4caf-88c3-d0f829a7b43a");
    expect(patient.gender).toBe("M");
    expect(patient.age).toBe(24);
    expect(patient.birthdate).toBe("1994-01-01T00:00:00.000-0500");
    expect(patientUtil.getGivenName(patient)).toBe("Neil");
    expect(patientUtil.getFamilyName(patient)).toBe("Young");
    expect(patientUtil.getMiddleName(patient)).toBeNull();
    expect(patient.identifiers.length).toBe(7);
    expect(patient.identifiers).toContainEqual({
      identifier: "Y2A5H1",
      identifierType: { uuid: "a541af1e-105c-40bf-b345-ba1fd6a59b85" },
      preferred: true
    });
    expect(patient.identifiers).toContainEqual({
      identifier: "TH000002",
      identifierType: { uuid: "e66645eb-03a8-4991-b4ce-e87318e37566" },
      preferred: false
    });
    expect(patientUtil.getAddressDisplay(patient)).toBe("Cange");
    expect(patientUtil.getCityVillage(patient)).toBe("Cerca Cavajal");
    expect(patientUtil.getStateProvince(patient)).toBe("Centre");
    expect(patientUtil.getCountry(patient)).toBe("Haiti");
    expect(patientUtil.getCountyDistrict(patient)).toBe("county");
    expect(patientUtil.getPostalCode(patient)).toBe("code");
    expect(patientUtil.getAddress1(patient)).toBe("Cange");
    expect(patientUtil.getAddress2(patient)).toBeNull();
    expect(patientUtil.getAddress3(patient)).toBe("Rang");

  });

  it('should create patient from simplified REST rep', () => {

    const patient = patientUtil.createFromRestRep(patientSimplifiedRep);

    expect(patient._openmrsClass).toBe("Patient");
    expect(patient.uuid).toBe("a46864ac-4cee-4e3a-a920-7b5799f1dc9a");
    expect(patient.gender).toBe("M");
    expect(patient.age).toBe(22);
    expect(patient.birthdate).toBe("1996-01-01T00:00:00.000-0500");
    expect(patientUtil.getGivenName(patient)).toBe("Bob");
    expect(patientUtil.getFamilyName(patient)).toBe("Dylan");
    expect(patientUtil.getMiddleName(patient)).toBeNull();
    expect(patient.identifiers.length).toBe(1);
    expect(patient.identifiers).toContainEqual({
      identifier: "Y2A73V",
      preferred: true
    });
    expect(patientUtil.getAddressDisplay(patient)).toBe("Cange");
    expect(patientUtil.getCityVillage(patient)).toBe("Boucan Carré");
    expect(patientUtil.getStateProvince(patient)).toBe("Centre");
    expect(patientUtil.getCountry(patient)).toBe("Haiti");
    expect(patientUtil.getAddress1(patient)).toBe("Cange");
    expect(patientUtil.getAddress2(patient)).toBeNull();
    expect(patientUtil.getAddress3(patient)).toBe("3ème des Bayes");

  });


  it('create from REST rep should be idempotent but always return new object', () => {

    const patient1 = patientUtil.createFromRestRep(patientFullRep);
    const patient2 = patientUtil.createFromRestRep(patient1);

    expect(patient1).not.toBe(patient2);
    expect(patient2.uuid).toBe("cda61f89-c342-4caf-88c3-d0f829a7b43a");
    expect(patient2.gender).toBe("M");
    expect(patient2.age).toBe(24);
    expect(patient2.birthdate).toBe("1994-01-01T00:00:00.000-0500");
    expect(patientUtil.getGivenName(patient2)).toBe("Neil");
    expect(patientUtil.getFamilyName(patient2)).toBe("Young");
    expect(patientUtil.getMiddleName(patient2)).toBeNull();
    expect(patient2.identifiers.length).toBe(7);
    expect(patient2.identifiers).toContainEqual({
      identifier: "Y2A5H1",
      identifierType: { uuid: "a541af1e-105c-40bf-b345-ba1fd6a59b85" },
      preferred: true
    });
    expect(patient2.identifiers).toContainEqual({
      identifier: "TH000002",
      identifierType: { uuid: "e66645eb-03a8-4991-b4ce-e87318e37566" },
      preferred: false
    });
    expect(patientUtil.getAddressDisplay(patient2)).toBe("Cange");
    expect(patientUtil.getCityVillage(patient2)).toBe("Cerca Cavajal");
    expect(patientUtil.getStateProvince(patient2)).toBe("Centre");
    expect(patientUtil.getCountry(patient2)).toBe("Haiti");
    expect(patientUtil.getCountyDistrict(patient2)).toBe("county");
    expect(patientUtil.getPostalCode(patient2)).toBe("code");
    expect(patientUtil.getAddress1(patient2)).toBe("Cange");
    expect(patientUtil.getAddress2(patient2)).toBeNull();
    expect(patientUtil.getAddress3(patient2)).toBe("Rang");

  });

  it("create patient from REST rep should be null safe", () => {
    expect(patientUtil.createFromRestRep(null)).toBeNull();
  });


  it('should add identifier to patient with existing identifiers', () => {
    var testPatient = Object.assign({}, patient1);
    expect(testPatient.identifiers.length).toBe(1);
    patientUtil.addIdentifier(testPatient, identifier1, identifierType1);
    expect(testPatient.identifiers.length).toBe(2);
    expect(patientUtil.getIdentifier(testPatient, { uuid: "identifierTypeUuid" })).toBe('identifier');
    expect(patientUtil.getIdentifier(testPatient, { uuid: "A2" })).toBe('123');
  });

  it('should add identifier to patient without existing identifiers', () => {
    var testPatient = { id: "1" };
    testPatient = patientUtil.addIdentifier(testPatient, identifier1, identifierType1);
    expect(testPatient.identifiers.length).toBe(1);
    expect(patientUtil.getIdentifier(testPatient, identifierType1)).toBe('123');
    patientUtil.addIdentifier(testPatient, identifier2, identifierType2, true);
    expect(testPatient.identifiers.length).toBe(2);
    expect(patientUtil.getIdentifier(testPatient, identifierType2)).toBe('456');
    var testPatient = {};
  });

  it('should not duplicate an identifier', () => {
    var testPatient = Object.assign({}, patient1);
    expect(testPatient.identifiers.length).toBe(1);
    patientUtil.addIdentifier(testPatient, identifier1, identifierType1);
    patientUtil.addIdentifier(testPatient, identifier1, identifierType1);
    expect(testPatient.identifiers.length).toBe(2);
    expect(patientUtil.getIdentifier(testPatient, identifierType1)).toBe('123');
  });

  it('should fetch multiple identifiers', () => {
    var testPatient = Object.assign({}, patient1);
    // add two identifiers of the same type
    patientUtil.addIdentifier(testPatient, identifier2, identifierType2, false);
    patientUtil.addIdentifier(testPatient, identifier3, identifierType3, true);
    expect(testPatient.identifiers.length).toBe(3);
    expect(patientUtil.getIdentifiers(testPatient, { uuid: "A3" })).toContain("456");
    expect(patientUtil.getIdentifiers(testPatient, { uuid: "A3" })).toContain("789");
  });

  it('should fetch first preferred identifiers', () => {
    var testPatient = Object.assign({}, patient1);
    // add two identifiers of the same type
    patientUtil.addIdentifier(testPatient, identifier2, identifierType2, false);
    patientUtil.addIdentifier(testPatient, identifier3, identifierType3, true);
    expect(patientUtil.getPreferredIdentifier(testPatient)).toContain("789");
  });

  it('should not fail if no preferred identifiers', () => {
    var testPatient = Object.assign({}, patient1);
    // add two identifiers of the same type
    patientUtil.addIdentifier(testPatient, identifier2, identifierType2, false);
    expect(patientUtil.getPreferredIdentifier(testPatient)).toBeNull();
  });


  it('should get telephone number', () => {
    var testPatient = Object.assign({}, patient1);
    expect(patientUtil.getTelephoneNumber(testPatient)).toBe('91767645');
  });

});
