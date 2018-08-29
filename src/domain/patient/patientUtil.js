// Domain Object for Patient: given a (full?) REST representation of a patient, creates a simplified view of them
// TODO this is *not* React specific and should be moved into another library?
// TODO is a full rep too big, we need to use a smaller size?
import * as R from 'ramda';
import { ATTRIBUTE_TYPES } from './constants';

/*
Expects patient plain javascript object in the form:

{
  id : $id,
  uuid : $uuid,
  gender : $gender,
  age : $age,
  birthdate : $birthdate,
  name : {
    givenName : $givenName,
    middleName : $middleName,
    familyName : $familyName,
  },
  address : {
    display : $display,
    cityVillage : $cityVillage,
    stateProvince : $stateProvince,
    country : $country,
    postalCode : $postalCode
  },
  identifiers : [
    ...
    {
      identifier : $identifier,
      identifierType : $identifierTypeUuid
    }
    ...
  ],
  attributes : [
    ...
    {
      display: $display,
      uuid: $uuid,
      value: $value,
      attributeType: $uuid
    }
    ...
  ],
  // TODO The following are implementation specific things which will be refactored and removed
  actions : $actions,
  alert : $alert,
  chw : $chw,
  village: $village
}
*/

const patientUtil = {

  getGivenName: (patient) => { return R.path(['name', 'givenName'], patient); },

  getMiddleName: (patient) => { return R.path(['name', 'middleName'], patient); },

  getFamilyName: (patient) => { return R.path(['name', 'familyName'], patient); },

  addIdentifier: (identifier, identifierType, patient) => {
    if (R.path(['identifiers'], patient)){
      patient.identifiers.push({ identifier: identifier, identifierType: identifierType });
    }
    else if (patient) {
      patient.identifiers = [ { identifier: identifier, identifierType: identifierType } ];
    }
    else {
      patient = { identifiers : [ { identifier: identifier, identifierType: identifierType } ] };
    }
    return patient;
  },

  getAddressDisplay: (patient) => { return R.path(['address', 'display'], patient); },

  getCityVillage: (patient) => { return R.path(['address', 'cityVillage'], patient); },

  getStateProvince: (patient) => { return R.path(['address', 'stateProvince'], patient); },

  getCountry: (patient) => { return R.path(['address', 'country'], patient); },

  getPostalCode: (patient) => { return R.path(['address', 'postalCode'], patient); },

  getTelephoneNumber: (patient) => {
    var attribute = patient.attributes.find((attribute) => {
      return (attribute.attributeType === ATTRIBUTE_TYPES.telephoneNumber); });
    return (R.path(['value'], attribute));
  },

  createFromRestRep: (restRep, visit) => {
    let patient = {};

    patient.id = restRep.id;
    patient.uuid = restRep.uuid;
    patient.gender = R.path(['person', 'gender'], restRep);
    patient.age = R.path(['person', 'age'], restRep);
    patient.birthdate = R.path(['person', 'birthdate'], restRep);

    // Preferred Name

    patient.name = R.path(['person', 'preferredName'], restRep) ? {
      givenName: restRep.person.preferredName.givenName,
      middleName: restRep.person.preferredName.middleName,
      familyName: restRep.person.preferredName.familyName
    } : undefined;

    // Identifiers

    patient.identifiers = restRep.identifiers ?
      restRep.identifiers.filter((identifier) => {
        return !identifier.voided;
      }).map((identifier) => {
        return { identifier: identifier.identifier, identifierType: identifier.identifierType.uuid };
      }) : undefined;

    patient.visit = (typeof visit !== 'undefined') ? visit :undefined;

    // Preferred Address

    patient.address = R.path(['person', 'preferredAddress'], restRep) ? {
      display: restRep.person.preferredAddress.display,
      cityVillage: restRep.person.preferredAddress.cityVillage,
      stateProvince: restRep.person.preferredAddress.stateProvince,
      country: restRep.person.preferredAddress.country,
      postalCode: restRep.person.preferredAddress.postalCode
    } : undefined;

    // Attributes

    patient.attributes = R.path(['person', 'attributes'], restRep) ?
      restRep.person.attributes.filter((attribute) => {
        return !attribute.voided;
      }).map((attribute) => {
        return {
          display: attribute.display,
          uuid: attribute.uuid,
          value: attribute.value,
          attributeType: attribute.attributeType,
        };
      }) : undefined;

    return patient;
  }

};

export default patientUtil;
