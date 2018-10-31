import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListGroupItem } from 'react-bootstrap';

let TaskListItem = props => {

  const completed = props.completed ? props.completed(props.patient) : false;

  let taskListItemStyle = {
    'border': 0,
    'color': completed ? props.colorComplete : props.colorPending
  };

  return (
    <ListGroupItem
      href={props.link ? '#' + props.link : ''}
      style={taskListItemStyle}
    >
      <FontAwesomeIcon
        icon="check"
        style={{ visibility: completed ? "visible" : "hidden" }}
      />
      &nbsp;{props.title}
      { props.timeFn && (
        bull
        )
      }
    </ListGroupItem>
  );

};

TaskListItem.propTypes = {
  colorComplete: PropTypes.string,
  colorPending: PropTypes.string,
  completed: PropTypes.func.isRequired,
  link: PropTypes.string,
  patient: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  timeFn: PropTypes.fn
};

TaskListItem.defaultProps = {
  colorComplete: "green",
  colorPending: "gray1"
};

export default TaskListItem;
