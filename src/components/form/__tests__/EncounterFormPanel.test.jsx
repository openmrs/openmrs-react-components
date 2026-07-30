import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import EncounterFormPanel from '../EncounterFormPanel';
import EncounterForm from '../EncounterForm';
import { FORM_STATES } from '../../../features/form/constants';

const mockStore = configureMockStore();

describe('EncounterFormPanel', () => {

  it('should forward formNamespace through to the wrapped EncounterForm', () => {

    const store = mockStore({
      openmrs: {
        form: {
          'test-form-instance-id': {
            state: FORM_STATES.EDITING,
            encounter: null
          }
        }
      }
    });

    const mountedComponent = mount(
      <Provider store={store}>
        <EncounterFormPanel
          formId="some-form-id"
          formInstanceId="test-form-instance-id"
          formNamespace="some-consumer-app"
          encounterType={{ uuid: "some-encounter-type-uuid" }}
          formContent={<div />}
          patient={{ uuid: "some-patient-uuid" }}
          showDate={false}
        />
      </Provider>
    );

    expect(mountedComponent.find(EncounterForm).props().formNamespace).toEqual("some-consumer-app");

  });

  it('should pass undefined formNamespace through when the consumer does not supply one, letting EncounterForm apply its own default', () => {

    const store = mockStore({
      openmrs: {
        form: {
          'test-form-instance-id-2': {
            state: FORM_STATES.EDITING,
            encounter: null
          }
        }
      }
    });

    const mountedComponent = mount(
      <Provider store={store}>
        <EncounterFormPanel
          formId="some-form-id"
          formInstanceId="test-form-instance-id-2"
          encounterType={{ uuid: "some-encounter-type-uuid" }}
          formContent={<div />}
          patient={{ uuid: "some-patient-uuid" }}
          showDate={false}
        />
      </Provider>
    );

    expect(mountedComponent.find(EncounterForm).props().formNamespace).toBeUndefined();

  });

});
