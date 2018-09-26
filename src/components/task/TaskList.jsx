import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem, ListGroup } from 'react-bootstrap';
import TaskListItem from './TaskListItem';

let TaskList = props => {

  return (
    <div>
      <ListGroup>
        {props.taskGroups.map(taskGroup => (
          <ListGroupItem
            header={taskGroup.title}
            key={taskGroup.key}
          >
            {taskGroup.tasks.map(task => (
              <TaskListItem
                completedFilters={task.completedFilters}
                key={task.title}
                link={task.link}
                patient={props.patient}
                requiredFilters={task.requiredFilters}
                title={task.title}
              />
            ))}
          </ListGroupItem>
        ))};
      </ListGroup>
    </div>
  );

};

TaskList.propTypes = {
  patient: PropTypes.object.isRequired,
  taskGroups: PropTypes.array.isRequired
};

export default TaskList;
