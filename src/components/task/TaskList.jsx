import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import TaskListGroup from './TaskListGroup';

import '../../../assets/css/taskList.css';

let TaskList = props => {

  return (
    <div className="task-list">
      <ListGroup>
        {props.taskGroups.map(taskGroup => (
          <TaskListGroup
            key={taskGroup.key}
            patient={props.patient}
            taskGroup={taskGroup}
          />
        ))}
      </ListGroup>
    </div>
  );

};

TaskList.propTypes = {
  patient: PropTypes.object.isRequired,
  taskGroups: PropTypes.array.isRequired
};

export default TaskList;
