import React from 'react';
import { mount } from 'enzyme';
import { ListGroup } from 'react-bootstrap';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TaskList from '../TaskList';

let props, store;
let mountedComponent;

const mockStore = configureMockStore();

const taskList = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <Provider store={store}>
        <TaskList {...props} />
      </Provider>
    );
  }
  return mountedComponent;
};

describe('Component: TaskList', () => {

  props = {
    patient: {},
    taskGroups: [
      {
        key: 1,
        title: "Group 1",
        tasks: [
          {
            title: "Check-In"
          }
        ]
      },
      {
        key: 2,
        title: "Group 2",
        tasks: [
          {
            title: "Viral Load",
          },
          {
            title: "Adherence Counseling",
          }
        ]
      }
    ]
  }

  store = mockStore();

  it('renders properly', () => {
    expect(taskList().find(ListGroup).length).toBe(1);
  });

});
