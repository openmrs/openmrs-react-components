// Domain Object for Patient: given a (full?) REST representation of a patient, creates a simplified view of them
// TODO this is *not* React specific and should be moved into another library?
// TODO is a full rep too big, we need to use a smaller size?

class Patient {

  // TODO add setters as well?

  getUuid() {
    return this.uuid;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getGender() {
    return this.gender;
  }

  getAge() {
    return this.age;
  }

  getBirthdate() {
    return this.birthdate;
  }

  getIdentifiers() {
    return this.identifiers;
  }

  static createFromRestRep(restRep, visit) {
    let patient = new Patient();

    patient.id = restRep.id;
    patient.uuid = restRep.uuid;
    patient.gender = restRep.person ? restRep.person.gender : undefined;
    patient.age = restRep.person ? restRep.person.age : undefined;
    patient.birthdate = restRep.person ? restRep.person.birthdate : undefined;

    patient.name = restRep.person.preferredName ? {
      givenName: restRep.person.preferredName.givenName,
      middleName: restRep.person.preferredName.middleName,
      familyName: restRep.person.preferredName.familyName
    } : undefined;

    patient.identifiers = restRep.identifiers.filter((identifier) => {
      return !identifier.voided;
    }).map((identifier) => {
      return { identifier: identifier.identifier, identifierType: identifier.identifierType.uuid };
    });

    patient.visit = (typeof visit !== 'undefined') ? visit :undefined;

    return patient;
  }

  static createFromReportingRestRep(restRep) {
    let patient = new Patient();

    patient.uuid = restRep.patient_uuid;
    patient.gender = restRep.gender;
    patient.age = restRep.age;
    patient.birthdate = restRep.birthdate;

    patient.name =  {
      givenName: restRep.first_name,
      familyName: restRep.last_name
    } ;

    patient.identifiers = {
      artNumber: restRep.art_number,
      eidNumber: restRep.eid_number,
      ncdNumber: restRep.ncd_number
    };

    patient.chw = restRep.vhw;
    patient.village = restRep.village;

    patient.actions = restRep.actions;
    patient.alert = restRep.alert;

    return patient;
  }
}


export default Patient;
