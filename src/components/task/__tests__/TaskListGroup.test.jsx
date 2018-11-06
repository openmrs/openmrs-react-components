import React from "react";
import {mount} from "enzyme/build";
import TaskListGroup from "../TaskListGroup";
import {ListGroupItem} from "reactstrap";


let props;
let mountedComponent;

const taskListGroup = () => {
  if (!mountedComponent) {
    mountedComponent = mount(
      <TaskListGroup {...props} />
    );
  }
  return mountedComponent;
};


describe('Component: TaskListGroup', () => {

  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('renders properly', () => {

    props = {
      patient: {},
      taskGroup: {
        key: 1,
        title: "Group 1",
        tasks: [
          {
            title: "Check-In"
          },
          {
            title: "Blood Pressure"
          }
        ]
      }
    };

    expect(taskListGroup().find(ListGroupItem).length).toBe(3);
 //   expect(taskListGroup().find(ListGroupItem).find({ header: 'Group 1' }).length).toBe(1);
    expect(taskListGroup().find(ListGroupItem).find({ title: 'Check-In' }).length).toBe(1);
    expect(taskListGroup().find(ListGroupItem).find({ title: 'Blood Pressure' }).length).toBe(1);

  });

  it('should hide task that is not required', () => {

    props = {
      patient: {},
      taskGroup: {
        key: 1,
        title: "Group 1",
        tasks: [
          {
            title: "Check-In"
          },
          {
            title: "Blood Pressure",
            required: () => false
          }
        ]
      }
    };

    expect(taskListGroup().find(ListGroupItem).length).toBe(2);
    //expect(taskListGroup().find(ListGroupItem).find({ header: 'Group 1' }).length).toBe(1);
    expect(taskListGroup().find(ListGroupItem).find({ title: 'Check-In' }).length).toBe(1);

  });


});
