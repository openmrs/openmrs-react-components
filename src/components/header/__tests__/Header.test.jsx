import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';

describe("header", () => {

  const mockStore = configureMockStore();

  it("should render correctly", () => {
    const sessionLocation = {
      uuid: '7fdfa2cb-bc95-405a-88c6-32b7673c0453',
      display: 'Laboratory',
      name: 'Laboratory',
      description: null,
      address1: null,
      address: null,
      cityVillage: null,
      stateProvince: null,
      country: null,
      postalCode: null,
      latitude: null,
      longitude: null,
      countyDistrict: null,
      address3: null,
      address4: null,
      address5: null,
      address6: null,
    };
    const user = { display: 'admin' };
    const locations= 
    [
      {
        uuid: 'aff27d58-a15c-49a6-9beb-d30dcfc0c66e',
        display: 'Amani Hospital',
        links: [
          {
            rel: 'self',
            uri: 'http://localhost:8081/openmrs-standalonehttp://localhost:8081/openmrs-standalone/ws/rest/v1/location/aff27d58-a15c-49a6-9beb-d30dcfc0c66e'
          }
        ]
      }
    ];
    const store = mockStore(
      {
        openmrs: {
          session: {
            sessionLocation,
            user
          },
          loginLocations: locations
        }
      });

    const rendered = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
