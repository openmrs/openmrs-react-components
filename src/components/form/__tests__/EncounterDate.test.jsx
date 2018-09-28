import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { reduxForm } from 'redux-form';
import EncounterDate from '../EncounterDate';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const DecoratedEncounterDate = reduxForm({
  form: 'testForm'
})(EncounterDate);

const encounterDate = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <DecoratedEncounterDate {...props} />
      </Provider>
    );
  }
  return mountedComponent;
};

describe("EncounterForm", () => {

  beforeEach(() => {
    store = mockStore({});
    mountedComponent = undefined;
  });

  it("should render correctly", () => {

    props = {
    };

    //console.log(store);
    expect(encounterDate().find('Field').length).toBe(1);
  });


});
