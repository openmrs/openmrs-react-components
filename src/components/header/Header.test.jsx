import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

describe("header", () => {

  const mockStore = configureMockStore();

  it("should render correctly", () => {
    const store = mockStore(
      {
        openmrs: {
          session: {
            user: {
              display: "Some user"
            }
          }
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
