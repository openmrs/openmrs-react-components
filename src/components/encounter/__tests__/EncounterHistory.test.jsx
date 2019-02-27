import React from 'react';
import configureMockStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import EncounterHistory from '../EncounterHistory';
import EncounterForm from "../../form/EncounterForm";

let props, store;
let mountedComponent

const mockStore = configureMockStore();

const encounterForm = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <EncounterHistory {...props} />
      </Provider>
    );
  }
  return mountedComponent;
};

describe("EncounterHistory", () => {

  it("should render correctly", () => {

    store = mockStore(
      {
        openmrs: {
          patients: {
            set: {
              'abcd-1234': { "uuid": "abcd-1234" },
              'efgh-5678': { "uuid": "efgh-5678" },
            },
            isUpdating: false,
            selected: 'abcd-1234'
          }
        }
      });

    props = {
      encounterType: {
        uuid: 'some-encounter-uuid'
      }
    };

    expect(encounterForm().find('div').length).toBe(1);
  });

});
