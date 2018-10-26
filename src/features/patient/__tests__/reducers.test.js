import { patientsReducer, getPatients, getSelectedPatient, isUpdating } from '../reducers';
import PATIENT_TYPES from '../types';

describe('patient set reducer', () => {

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
    expect(patientsReducer(undefined, {})).toEqual( {
      set: {},
      selected: null,
      isUpdating: false
    });
  });

  it('should return patients as Object map', () => {
    const patients = patientsReducer({
      set: {},
      selected: null,
      isUpdating: true
    }, {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: [samplePatient, anotherSamplePatient]
    });

    expect(patients.set['abcd-1234']).toEqual(samplePatient);
    expect(patients.set['efgh-5678']).toEqual(anotherSamplePatient);
    expect(patients.selected).toBeNull();
    expect(patients.isUpdating).toBe(false);
  });

  it('should handle empty patient list', () => {
    const patients = patientsReducer({
      set: {},
      selected: null,
      isUpdating: true
    }, {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: []
    });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false
    });
  });

  it('should handle undefined patient list', () => {
    const patients = patientsReducer({
      set: {},
      selected: null,
      isUpdating: true
    }, {
      type: PATIENT_TYPES.SET_PATIENT_STORE
    });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false
    });
  });


  it('should clear patient store', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        isUpdating: false,
        selected: 'abcd-efgh'
      }, {
        type: PATIENT_TYPES.CLEAR_PATIENT_STORE
      });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false
    });
  });

  it('should return patients with visits as Object map', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        isUpdating: false,
        selected: 'abcd-efgh'
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
        visits: [sampleVisit, anotherSampleVisit]
      });

    expect(patients.set['abcd-1234']['visit']).toEqual(sampleVisit);
    expect(patients.set['efgh-5678']['visit']).toEqual(anotherSampleVisit);
    expect(patients.selected).toBe('abcd-efgh');
    expect(patients.isUpdating).toBe(false);
  });

  it('should handle empty visits list', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        isUpdating: true,
        selected: 'abcd-efgh'
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
        visits: []
      });

    expect(patients.set['abcd-1234']['visit']).toBeUndefined();
    expect(patients.set['efgh-5678']['visit']).toBeUndefined();
    expect(patients.selected).toBe('abcd-efgh');
    expect(patients.isUpdating).toBe(false);
  });

  it('should handle undefined visits list', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        isUpdating: true,
        selected: 'abcd-efgh'
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
      });

    expect(patients.set['abcd-1234']['visit']).toBeUndefined();
    expect(patients.set['efgh-5678']['visit']).toBeUndefined();
    expect(patients.selected).toBe('abcd-efgh');
    expect(patients.isUpdating).toBe(false);
  });

  it('should add patient with active visit but not in Object map', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        isUpdating: true,
        selected: 'abcd-efgh'
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
        visits: [newPatientSampleVisit]
      });

    expect(patients.set['ijkl-9012']).toEqual(
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
      set:
        {
          'abcd-1234': {
            _openmrsClass: "Patient",
            uuid: "abcd-1234",
            givenName: "Bob"
          }
        },
      selected: null,
      isUpdating: false
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
      set: {
        "abcd-1234": existingPatient
      },
      selected: null,
      isUpdating: true
    };

    const expected = {
      set: {
        "abcd-1234": existingPatient,
        "efgh-5678": newPatient
      },
      selected: null,
      isUpdating: false
    };


    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.ADD_PATIENT_TO_STORE,
      patient: newPatient
    });

    expect(updated).toEqual(expected);

  });

  it('update patient should update patient if patient already in Object map', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: null,
      isUpdating: true
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        }
      },
      selected: null,
      isUpdating: false
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

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: null,
      isUpdating: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abc-1234",
      isUpdating: false
    };

    const patient = {};
    patient.uuid = 'abc-1234';

    expect(patientsReducer(initial, {
      type: PATIENT_TYPES.SET_SELECTED_PATIENT,
      patient: patient
    })).toEqual(expected);

  });

  it('clear patient selected should remove from selected', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abc-1234",
      isUpdating: true
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: null,
      isUpdating: true
    };

    expect(patientsReducer(initial, {
      type: PATIENT_TYPES.CLEAR_SELECTED_PATIENT,
    })).toEqual(expected);

  });

  it('set is loading should set is loading', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abc-1234",
      isUpdating: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abc-1234",
      isUpdating: true
    };

    expect(patientsReducer(initial, {
      type: PATIENT_TYPES.SET_PATIENT_STORE_UPDATING,
    })).toEqual(expected);

  });

  it ('should select patient set from store', () => {

    const store = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abcd-1234",
      isUpdating: true
    };

    const expected = {
      'abcd-1234': {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Bob"
      }
    };

    expect(getPatients(store)).toEqual(expected);

  });

  it ('should select selected patient from store', () => {

    const store = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abcd-1234",
      isUpdating: true
    };

    const expected = {
      _openmrsClass: "Patient",
      uuid: "abcd-1234",
      givenName: "Bob"
    };

    expect(getSelectedPatient(store)).toEqual(expected);

  });

  it ('select selected patient should return null if no selected patient', () => {

    const store = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: null,
      isUpdating: true
    };

    expect(getSelectedPatient(store)).toEqual(null);

  });

  it ('is updating should return whether store is updating', () => {

    const store = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: null,
      isUpdating: true
    };

    expect(isUpdating(store)).toEqual(true);

  });

});
