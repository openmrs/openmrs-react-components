import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Login from '../Login';
import LoginForm from '../LoginForm';

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
    store = mockStore({});
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(login())).toMatchSnapshot();
    expect(login().find(LoginForm).length).toBe(1);
    expect(login().find(LoginForm).props().onSubmit.length).toBe(1);
    expect(login().find(LoginForm).props().onSubmit.name).toBe("bound handleLogin");
  });

  it('onSubmit triggers login action', () => {
    const onSubmit = login().find(LoginForm).props().onSubmit;
    onSubmit({ username: "somename", password: "somepassword" });
    expect(store.getActions()).toContainEqual({"password": "somepassword", "type": "login/REQUESTED", "username": "somename"});
  });

});
