import { selectors } from "../store";

describe ("store selectors", () => {

  it('should select patients from store', ()=> {

    const store = {
      openmrs: {
        patients:
          {
            set: {
              'abcd-1234': {
                _openmrsClass: "Patient",
                uuid: "abcd-1234",
                givenName: "Bob"
              }
            },
            selected: "abcd-1234",
            isUpdating: true
          }
      }
    };

    const expected = {
      'abcd-1234': {
        _openmrsClass: "Patient",
        uuid: "abcd-1234",
        givenName: "Bob"
      }
    };

    expect(selectors.getPatientStore(store)).toEqual(expected);

  });

  it('should get selected patients from store', ()=> {

    const store = {
      openmrs: {
        patients:
          {
            set: {
              'abcd-1234': {
                _openmrsClass: "Patient",
                uuid: "abcd-1234",
                givenName: "Bob"
              }
            },
            selected: "abcd-1234",
            isUpdating: true
          }
      }
    };

    const expected = {
      _openmrsClass: "Patient",
      uuid: "abcd-1234",
      givenName: "Bob"
    };

    expect(selectors.getSelectedPatientFromStore(store)).toEqual(expected);

  });


  it('should get patient store is updating from store', ()=> {

    const store = {
      openmrs: {
        patients:
          {
            set: {
              'abcd-1234': {
                _openmrsClass: "Patient",
                uuid: "abcd-1234",
                givenName: "Bob"
              }
            },
            selected: "abcd-1234",
            isUpdating: true
          }
      }
    };

    expect(selectors.isPatientStoreUpdating(store)).toEqual(true);

  });

});

