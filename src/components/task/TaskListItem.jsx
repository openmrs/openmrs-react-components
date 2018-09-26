import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListGroupItem } from 'react-bootstrap';

let TaskListItem = props => {

  const applyFilters =  (list, filters) => {
    if (filters.length === 0) {
      return list;
    } else {
      return applyFilters(list.filter(filters[filters.length - 1]), filters.slice(0, -1));
    }
  };

  const required = applyFilters([props.patient], props.requiredFilters).length > 0;
  const completed = applyFilters([props.patient], props.completedFilters).length > 0;

  return (
    <ListGroupItem href={props.link ? '#' + props.link : ''}>
      { completed &&
      <FontAwesomeIcon icon="check" />
      }
      { required && !completed &&
      <FontAwesomeIcon icon="arrow-right" />
      }
      &nbsp;{props.title}
    </ListGroupItem>
  );

};

TaskListItem.propTypes = {
  completedFilters: PropTypes.array.isRequired,
  link: PropTypes.string,
  patient: PropTypes.object.isRequired,
  requiredFilters: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

TaskListItem.defaultProps = {
  completedFilters: [() => false],
  requiredFilters: [() => false]
};

export default TaskListItem;
