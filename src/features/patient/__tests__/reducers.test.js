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
      isUpdating: false,
      isError: false
    });
  });

  it('should return patients as Object map', () => {
    const patients = patientsReducer({
      set: {},
      selected: null,
      isUpdating: true,
      isError: false
    }, {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: [samplePatient, anotherSamplePatient]
    });

    expect(patients.set['abcd-1234']).toEqual(samplePatient);
    expect(patients.set['efgh-5678']).toEqual(anotherSamplePatient);
    expect(patients.selected).toBeNull();
    expect(patients.isUpdating).toBe(false);
    expect(patients.isError).toBe(false);
  });

  it('should handle empty patient list', () => {
    const patients = patientsReducer({
      set: {},
      selected: null,
      isUpdating: true,
      isError: false
    }, {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: []
    });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false,
      isError: false
    });
  });

  it('should handle undefined patient list', () => {
    const patients = patientsReducer({
      set: {},
      selected: null,
      isUpdating: true,
      isError: false,
    }, {
      type: PATIENT_TYPES.SET_PATIENT_STORE
    });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false,
      isError: false
    });
  });


  it('should clear patient store', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        selected: 'abcd-efgh',
        isUpdating: false,
        isError: false
      }, {
        type: PATIENT_TYPES.CLEAR_PATIENT_STORE
      });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false,
      isError: false
    });
  });

  it('should return patients with visits as Object map', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        selected: 'abcd-efgh',
        isUpdating: false,
        isError: false
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
        visits: [sampleVisit, anotherSampleVisit]
      });

    expect(patients.set['abcd-1234']['visit']).toEqual(sampleVisit);
    expect(patients.set['efgh-5678']['visit']).toEqual(anotherSampleVisit);
    expect(patients.selected).toBe('abcd-efgh');
    expect(patients.isUpdating).toBe(false);
    expect(patients.isError).toBe(false);
  });

  it('should handle empty visits list', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        selected: 'abcd-efgh',
        isUpdating: true,
        isError: false
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
        visits: []
      });

    expect(patients.set['abcd-1234']['visit']).toBeUndefined();
    expect(patients.set['efgh-5678']['visit']).toBeUndefined();
    expect(patients.selected).toBe('abcd-efgh');
    expect(patients.isUpdating).toBe(false);
    expect(patients.isError).toBe(false);
  });

  it('should handle undefined visits list', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        selected: 'abcd-efgh',
        isUpdating: true,
        isError: false
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
      });

    expect(patients.set['abcd-1234']['visit']).toBeUndefined();
    expect(patients.set['efgh-5678']['visit']).toBeUndefined();
    expect(patients.selected).toBe('abcd-efgh');
    expect(patients.isUpdating).toBe(false);
    expect(patients.isError).toBe(false);
  });

  // we are no longer supporting this use case
  /*it('should add patient with active visit but not in Object map', () => {
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
  });*/

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
      isUpdating: true,
      isError: false
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
      isUpdating: false,
      isError: false
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

  it('update patient should add patient if patient not in Object map', () => {

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
      isUpdating: true,
      isError: false,
    };

    const expected = {
      set: {
        "abcd-1234": existingPatient,
        "efgh-5678": newPatient
      },
      selected: null,
      isUpdating: false,
      isError: false
    };


    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENT_IN_STORE,
      patient: newPatient
    });

    expect(updated).toEqual(expected);

  });

  it('update patient should not update active visit', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob",
          visit: {
            uuid: "some-visit-uuid"
          }
        }
      },
      selected: null,
      isUpdating: true,
      isError: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe",
          visit: {
            uuid: "some-visit-uuid"
          }
        }
      },
      selected: null,
      isUpdating: false,
      isError: false
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENT_IN_STORE,
      patient: {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Joe"
      },
      fieldsToExclude: ['visit']
    });

    expect(updated).toEqual(expected);

  });

  it('update patients should not modifiy set if no patients passed in', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        },
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Claire"
        }
      },
      selected: null,
      isUpdating: true,
      isError: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        },
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Claire"
        }
      },
      selected: null,
      isUpdating: false,
      isError: false
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE,
      patients: [
      ]
    });

    expect(updated).toEqual(expected);

  });

  it('update patients should update patients if patients already in Object map', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        },
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Claire"
        }
      },
      selected: null,
      isUpdating: true,
      isError: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        },
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Fred"
        }
      },
      selected: null,
      isUpdating: false,
      isError: false
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE,
      patients: [
        {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        },
        {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Fred"
        }
      ]
    });

    expect(updated).toEqual(expected);

  });

  it('update patients should add patients if patients not in Object map', () => {

    const initial = {
      set: {
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Claire"
        }
      },
      selected: null,
      isUpdating: true,
      isError: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        },
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Fred"
        }
      },
      selected: null,
      isUpdating: false,
      isError: false
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE,
      patients: [
        {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        },
        {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Fred"
        }
      ]
    });

    expect(updated).toEqual(expected);

  });

  it('update patients should not remove patients if patients not in Object map', () => {

    const initial = {
      set: {
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Claire"
        }
      },
      selected: null,
      isUpdating: true,
      isError: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        },
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Claire"
        }
      },
      selected: null,
      isUpdating: false,
      isError: false
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE,
      patients: [
        {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        }
      ]
    });

    expect(updated).toEqual(expected);

  });


  it('update patients should not update active visit', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob",
          visit: {
            uuid: "some-visit-uuid"
          }
        }
      },
      selected: null,
      isUpdating: true,
      isError: false
    };

    const expected = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe",
          visit: {
            uuid: "some-visit-uuid"
          }
        }
      },
      selected: null,
      isUpdating: false,
      isError: false
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE,
      patients: [
        {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Joe"
        }
      ]
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
      isUpdating: false,
      isError: false
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
      isUpdating: false,
      isError: false
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
      isUpdating: true,
      isError: false
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
      isUpdating: true,
      isError: false
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
      isUpdating: false,
      isError: false
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
      isUpdating: true,
      isError: false
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
      isUpdating: true,
      isError: false
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

  it('should set error flag and clear patient store', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        selected: 'abcd-efgh',
        isUpdating: false,
        isError: false
      }, {
        type: PATIENT_TYPES.SET_PATIENT_STORE_ERROR
      });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false,
      isError: true
    });
  });

  it('setting patient store should clear error flag', () => {
    const patients = patientsReducer({
      set: {},
      selected: null,
      isUpdating: true,
      isError: true
    }, {
      type: PATIENT_TYPES.SET_PATIENT_STORE,
      patients: [samplePatient, anotherSamplePatient]
    });

    expect(patients.set['abcd-1234']).toEqual(samplePatient);
    expect(patients.set['efgh-5678']).toEqual(anotherSamplePatient);
    expect(patients.selected).toBeNull();
    expect(patients.isUpdating).toBe(false);
    expect(patients.isError).toBe(false);
  });

  it('clear patient store should clear error flag', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        selected: 'abcd-efgh',
        isUpdating: false,
        isError: true
      }, {
        type: PATIENT_TYPES.CLEAR_PATIENT_STORE
      });

    expect(patients).toEqual( {
      set: {},
      selected: null,
      isUpdating: false,
      isError: false
    });
  });

  it('set is updating should not clear error flag', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abc-1234",
      isUpdating: false,
      isError: true
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
      isUpdating: true,
      isError: true
    };

    expect(patientsReducer(initial, {
      type: PATIENT_TYPES.SET_PATIENT_STORE_UPDATING,
    })).toEqual(expected);

  });

  it('set is not updating should not clear error flag', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: "abc-1234",
      isUpdating: true,
      isError: true
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
      isUpdating: false,
      isError: true
    };

    expect(patientsReducer(initial, {
      type: PATIENT_TYPES.SET_PATIENT_STORE_NOT_UPDATING,
    })).toEqual(expected);

  });

  // the only way to clear the error flag is to SET or CLEAR the store;
  // however, we currently don't *prevent* an update in case of an error, we may want to change this
  it('update active visits should not clear error flag', () => {
    const patients = patientsReducer(
      {
        set: {
          'abcd-1234': { "uuid": "abcd-1234" },
          'efgh-5678': { "uuid": "efgh-5678" },
        },
        selected: 'abcd-efgh',
        isUpdating: false,
        isError: true
      }, {
        type: PATIENT_TYPES.UPDATE_ACTIVE_VISITS_IN_STORE,
        visits: [sampleVisit, anotherSampleVisit]
      });

    expect(patients.isError).toBe(true);
  });


  // the only way to clear the error flag is to SET or CLEAR the store;
  // however, we currently don't *prevent* an update in case of an error, we may want to change this
  it('update patient should not clear error flag', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        }
      },
      selected: null,
      isUpdating: true,
      isError: true
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENT_IN_STORE,
      patient: {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Joe"
      }
    });

    expect(updated.isError).toBe(true);

  });

  // the only way to clear the error flag is to SET or CLEAR the store;
  // however, we currently don't *prevent* an update in case of an error, we may want to change this
  it('update patients should not clear error flag', () => {

    const initial = {
      set: {
        'abcd-1234': {
          _openmrsClass: "Patient",
          uuid: "abcd-1234",
          givenName: "Bob"
        },
        'efgh-5678': {
          _openmrsClass: "Patient",
          uuid: "efgh-5678",
          givenName: "Claire"
        }
      },
      selected: null,
      isUpdating: true,
      isError: true
    };

    const updated = patientsReducer(initial, {
      type: PATIENT_TYPES.UPDATE_PATIENTS_IN_STORE,
      patients: [
      ]
    });

    expect(updated.isError).toBe(true);

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
      isUpdating: true,
      isError: false
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
      isUpdating: true,
      isError: false,
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
      isUpdating: true,
      isError: false
    };

    expect(isUpdating(store)).toEqual(true);

  });

});
