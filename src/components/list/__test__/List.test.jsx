import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { spy } from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import DataGrid from '../../grid/DataGrid';
import List from '../List';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

spy(List.prototype, 'componentDidMount');

const list = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <List {... props} />
      </Provider>
    );
  }
  return mountedComponent;
};

describe('Component: List', () => {
  beforeEach(() => {
    // in an actual implementation of a list, these would be mapped in
    props = {
      rowData: [],
      dispatch: () => {}
    };
    store = mockStore({});
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(list())).toMatchSnapshot();
    expect(list().find(DataGrid).length).toBe(1);
    expect(list().find(DataGrid).props().rowSelectedActionCreators.length).toBe(1);
    expect(list().find(DataGrid).props().rowSelectedActionCreators[0].name).toBe("redirectToInfoPageActionCreator");
    expect(list().find(DataGrid).props().rowSelectedActionCreators[0]().payload.args[0]).toBe("/");
    expect(List.prototype.componentDidMount.calledOnce).toBe(true);
  });
});
