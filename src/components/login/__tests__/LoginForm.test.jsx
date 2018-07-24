import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import LoginForm from '../LoginForm';


describe("Component: LoginForm", () => {

  const mockStore = configureMockStore();

  it("should render correctly", () => {

    const store = mockStore(
      {
        dispatch: {},
        openmrs: {
          loginLocations: {
            list: []
          }
        }
      });
    const locations = [];

    const rendered = renderer.create(
      <Provider store={store}>
        <LoginForm locations={locations}/>
      </Provider>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
