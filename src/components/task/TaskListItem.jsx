import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListGroupItem } from 'react-bootstrap';

let TaskListItem = props => {

  const completed = props.completed ? props.completed(props.patient) : false;

  return (
    <ListGroupItem href={props.link ? '#' + props.link : ''}>
      { completed &&
      <FontAwesomeIcon icon="check" />
      }
      { !completed &&
      <FontAwesomeIcon icon="arrow-right" />
      }
      &nbsp;{props.title}
    </ListGroupItem>
  );

};

TaskListItem.propTypes = {
  completed: PropTypes.func.isRequired,
  link: PropTypes.string,
  patient: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

TaskListItem.defaultProps = {
  completedFilters: [() => false],
  requiredFilters: [() => false]
};

export default TaskListItem;
