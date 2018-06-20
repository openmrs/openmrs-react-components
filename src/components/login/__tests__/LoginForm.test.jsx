import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import LoginForm from '../LoginForm';


describe("loginForm", () => {

  const mockStore = configureMockStore();

  it("should render correctly", () => {

    const store = mockStore({});

    const rendered = renderer.create(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    expect(rendered.toJSON()).toMatchSnapshot();
  });

});
