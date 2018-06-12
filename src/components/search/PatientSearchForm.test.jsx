import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import PatientSearchForm from './PatientSearchForm';


describe("patientSearchForm", () => {

  const mockStore = configureMockStore();

  it("should render correctly", () => {

    const store = mockStore({});

    const rendered = renderer.create(
      <Provider store={store}>
        <PatientSearchForm/>
      </Provider>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
