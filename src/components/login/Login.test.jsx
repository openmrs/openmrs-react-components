import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Login from './Login';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const login = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <Login {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: Login', () => {
  beforeEach(() => {
    props = {};
    store = mockStore(
      {});
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(login())).toMatchSnapshot();
  });

});
