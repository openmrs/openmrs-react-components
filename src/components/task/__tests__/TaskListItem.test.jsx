import React from 'react';
import { mount } from 'enzyme';
import { ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskListItem from '../TaskListItem';

let props;
let mountedComponent;

const taskList = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <TaskListItem {...props} />
    );
  }
  return mountedComponent;
};

describe('Component: TaskLisItem', () => {

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders properly', () => {

    props = {
      title: "Blood Pressure",
      patient: {
        uuid: 'abcd'
      },
    };

    expect(taskList().find(ListGroupItem).length).toBe(1);
    expect(taskList().find(ListGroupItem).text()).toContain("Blood Pressure");
  });

  it('renders checkmark when task completed', () => {

    props = {
      title: "Blood Pressure",
      patient: {
        uuid: 'abcd'
      },
      completed: () => true,
    };

    expect(taskList().find(ListGroupItem).length).toBe(1);
    expect(taskList().find(ListGroupItem).text()).toContain("Blood Pressure");
    expect(taskList().find(FontAwesomeIcon).length).toBe(1);
    expect(taskList().find(FontAwesomeIcon).props().icon).toBe("check");

  });

  it('renders arrow when task required', () => {

    props = {
      title: "Blood Pressure",
      patient: {
        uuid: 'abcd'
      },
      completed: () => false,
    };

    expect(taskList().find(ListGroupItem).length).toBe(1);
    expect(taskList().find(ListGroupItem).text()).toContain("Blood Pressure");
    expect(taskList().find(FontAwesomeIcon).length).toBe(1);
    expect(taskList().find(FontAwesomeIcon).props().icon).toBe("arrow-right");

  });

});
