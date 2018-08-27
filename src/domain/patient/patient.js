// Domain Object for Patient: given a (full?) REST representation of a patient, creates a simplified view of them
// TODO this is *not* React specific and should be moved into another library?
// TODO is a full rep too big, we need to use a smaller size?
import * as R from 'ramda';



const patient = {

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

export default patient;







