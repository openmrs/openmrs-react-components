import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import MockRouter from 'react-mock-router';
import LoginPage from '../LoginPage';
import Login from '../Login';


let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const loginPage = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <MockRouter>
          <LoginPage {...props} />
        </MockRouter>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: LoginPage', () => {
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

  it('renders Redirect if patient authenticated', () => {

    const expectedTo = {
      pathname: "login"
    };

    store = mockStore(
      {
        openmrs: {
          session: {
            authenticated: true
          }
        }
      }
    );

    props = {
      location: {
        state: {
          from: {
            pathname: "login"
          }
        }
      }
    };

    expect(toJson(loginPage())).toMatchSnapshot();
    expect(loginPage().find(Redirect).length).toBe(1);
    expect(loginPage().find(Redirect).props().to).toEqual(expectedTo);
  });


});
