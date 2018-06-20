import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import LoginPage from './LoginPage';
import Login from './Login';


let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const loginPage = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: Login', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders Login if not authenticated', () => {

    store = mockStore(
      {
        openmrs: {
          session: {
            authenticated: false
          }
        }
      }
    );
    props = {
      location: {
        state: ""
      }
    };

    expect(toJson(loginPage())).toMatchSnapshot();
    expect(loginPage().find(Login).length).toBe(1);
  });

  // figure out how to test the rendering of the Redirect
/*  it('renders Redirect if patient authenticated', () => {

  });*/


});
