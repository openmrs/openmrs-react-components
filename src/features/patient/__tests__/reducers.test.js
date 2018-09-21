import { patientsReducer, patientSelectedReducer } from '../reducers';
import PATIENT_TYPES from '../types';

describe('patient list reducer', () => {

  const samplePatient = {
    _openmrsClass: "Patient",
    uuid: "abcd-1234"
  };


  const anotherSamplePatient = {
    _openmrsClass: "Patient",
    uuid: "efgh-5678"
  };

  const sampleVisit = {
    uuid: 'ijkl-9012',
    patient: {
      uuid: 'abcd-1234'
    }
  };

  const anotherSampleVisit = {
    uuid: 'mnop-3456',
    patient: {
      uuid: 'efgh-5678'
    }
  };

  const newPatientSampleVisit = {
    uuid: 'qrst-7890',
    patient: {
      uuid: 'ijkl-9012',
    }
  };

  it('should return the initial state', () => {
    expect(patientsReducer(undefined, {})).toEqual({});
  });

  it('should return patients as Object map', () => {
    const patients = patientsReducer({}, {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: [samplePatient, anotherSamplePatient]
    });

    expect(patients['abcd-1234']).toEqual(samplePatient);
    expect(patients['efgh-5678']).toEqual(anotherSamplePatient);
  });

  it('should handle empty patient list', () => {
    const patients = patientsReducer({}, {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: []
    });

    expect(patients).toEqual({});
  });

  it('should handle undefined patient list', () => {
    const patients = patientsReducer({}, {
      type: PATIENT_TYPES.SET_PATIENT_STORE
    });

    expect(patients).toEqual({});
  });

  it('should return patients with visits as Object map', () => {
    const patients = patientsReducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
      visits: [sampleVisit, anotherSampleVisit]
    });

    expect(patients['abcd-1234']['visit']).toEqual(sampleVisit);
    expect(patients['efgh-5678']['visit']).toEqual(anotherSampleVisit);
  });

  it('should handle empty visits list', () => {
    const patients = patientsReducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
      visits: []
    });

    expect(patients['abcd-1234']).toEqual({ "uuid": "abcd-1234" });
    expect(patients['efgh-5678']).toEqual({ "uuid": "efgh-5678" });
  });

  it('should handle undefined visits list', () => {
    const patients = patientsReducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
    });

    expect(patients['abcd-1234']).toEqual({ "uuid": "abcd-1234" });
    expect(patients['efgh-5678']).toEqual({ "uuid": "efgh-5678" });
  });

  it('should add patient with active visit but not in Object map', () => {
    const patients = patientsReducer({
      'abcd-1234': { "uuid": "abcd-1234" },
      'efgh-5678': { "uuid": "efgh-5678" },
    }, {
      type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
      visits: [newPatientSampleVisit]
    });

    expect(patients['ijkl-9012']).toEqual(
      {
        "_openmrsClass": "Patient",
        "address": {},
        "attributes": [],
        "identifiers": [],
        "uuid": "ijkl-9012",
        "visit":
          {
            "patient":
              {
                "uuid": "ijkl-9012"
              },
            "uuid": "qrst-7890"
          }
      });
  });

  it('add patient should not add patient if patient already in Object map', () => {

    const initial = {
      'abcd-1234': {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Bob"
      }
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.ADD_PATIENT_TO_STORE,
      patient: {
        uuid: "abcd-1234",
        givenName: "Joe"
      }
    });

    expect(updated).toEqual(initial);

  });

  it('add patient should add patient if patient not in Object map', () => {

    const existingPatient = {
      _openmrsClass: "Patient",
      uuid: "abcd-1234",
      givenName: "Bob"
    };

    const newPatient = {
      _openmrsClass: "Patient",
      uuid: "efgh-5678",
      givenName: "Claire"
    };

    const initial = {
      "abcd-1234": existingPatient
    };

    const expected = {
      "abcd-1234": existingPatient,
      "efgh-5678": newPatient
    };


    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.ADD_PATIENT_TO_STORE,
      patient: newPatient
    });

    expect(updated).toEqual(expected);

  });

  it('update patient should update patient if patient already in Object map', () => {

    const initial = {
      'abcd-1234': {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Bob"
      }
    };

    const expected = {
      'abcd-1234': {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Joe"
      }
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENT_IN_STORE,
      patient: {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Joe"
      }
    });

    expect(updated).toEqual(expected);

  });

  it('set selected patient should set patient as selected', () => {

    const patient = {};
    patient.uuid = 'abc-123';

    expect(patientSelectedReducer(undefined, {
      type: PATIENT_TYPES.SET_SELECTED_PATIENT,
      patient: patient
    })).toEqual(patient.uuid);

  });

  it('clear patient selected should remove from selected', () => {

    const patient = {};

    expect(patientSelectedReducer({ patient: patient }, {
      type: PATIENT_TYPES.CLEAR_SELECTED_PATIENT,
    })).toBeNull();

  });

});
