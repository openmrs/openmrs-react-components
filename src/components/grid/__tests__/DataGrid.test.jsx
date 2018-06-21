import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { spy } from 'sinon';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import DataGrid from '../DataGrid';


let props, store;
let mountedComponent;

const mockStore = configureMockStore();

spy(DataGrid.prototype, 'componentDidMount');

const dataGrid = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <DataGrid {... props} />
      </Provider>
    );
  }
  return mountedComponent;
};

describe('Component: DataGrid', () => {
  beforeEach(() => {
    // in an actual implementation of a queue, these would be mapped in
    props = {
      rowData: [],
      dispatch: () => {}
    };
    store = mockStore({});
    mountedComponent = undefined;
  });

  it('renders properly', () => {
    expect(toJson(dataGrid())).toMatchSnapshot();
    expect(DataGrid.prototype.componentDidMount.calledOnce).toBe(true);
  });
});
