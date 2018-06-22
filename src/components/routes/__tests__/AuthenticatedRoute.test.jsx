import React from 'react';
import MockRouter from 'react-mock-router';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import AuthenticatedRoute from '../AuthenticatedRoute';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const DummyComponent = props => (
  <div>
    <p>
      Sample
    </p>
  </div>
);

const authenicatedRoute = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <MockRouter>
          <AuthenticatedRoute {...props} />
        </MockRouter>
      </Provider>);
  }
  return mountedComponent;
};

describe('Component: Authenticated Route', () => {
  beforeEach(() => {

    props = {
      component: DummyComponent,
      path: "some_path",
      redirectOnLogin: "/"
    };

    mountedComponent = undefined;
  });

  it('renders properly when session authenicated', () => {

    store = mockStore(
      {
        openmrs: {
          session: {
            authenticated: true
          }
        }
      }
    );

    expect(toJson(authenicatedRoute())).toMatchSnapshot();
    expect(authenicatedRoute().find(Route).length).toBe(1);
    expect(authenicatedRoute().find(Route).props().component).toBe(DummyComponent);
    expect(authenicatedRoute().find(Route).props().path).toBe("some_path");
  });

  it('renders properly when session not authenicated', () => {

    const expectedTo = {
      pathname: "/login",
      state: {
        from: "/"
      }
    };

    store = mockStore(
      {
        openmrs: {
          session: {
            authenticated: false
          }
        }
      }
    );

    expect(toJson(authenicatedRoute())).toMatchSnapshot();
    expect(authenicatedRoute().find(Redirect).length).toBe(1);
    expect(authenicatedRoute().find(Redirect).props().to).toEqual(expectedTo);
  });


});
