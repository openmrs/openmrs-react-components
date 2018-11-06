import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'reactstrap';
import TaskListGroup from './TaskListGroup';

let TaskList = props => {

  return (
    <div>
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
