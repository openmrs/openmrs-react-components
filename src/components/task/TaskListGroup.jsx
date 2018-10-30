import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';
import TaskListItem from './TaskListItem';

let TaskListGroup = props => {

  const requiredTasks = props.taskGroup.tasks.filter((task) => task.required ? task.required(props.patient) : true);

  if (requiredTasks.length > 0) {
    return (
      <ListGroupItem
        header={props.taskGroup.title}
        key={props.taskGroup.key}
      >
        {requiredTasks.map(task => (
          <TaskListItem
            completed={task.completed}
            key={task.title}
            link={task.link}
            patient={props.patient}
            title={task.title}
          />
        ))}
      </ListGroupItem>);
  }
  else {
    return (null);
  }

};

TaskListGroup.propTypes = {
  patient: PropTypes.object.isRequired,
  taskGroup: PropTypes.object.isRequired
};

export default TaskListGroup;


