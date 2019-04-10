import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';
import TaskListItem from './TaskListItem';

class TaskListGroup extends React.PureComponent {

  constructor(props) {
    super(props);

    this.requiredTasks = props.taskGroup.tasks.filter((task) => task.required ? task.required(props.patient) : true);

    // TODO have a way for this to be overridden
    this.taskListGroupStyle = {
      'border': 0,
      'padding': "5px",
    };

    this.state = {
      expanded: typeof(props.taskGroup.expanded) !== 'undefined' ? props.taskGroup.expanded : true
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  };

  toggleExpanded(e) {
    // bit of a hack, we only want to expand/contract when clicking on the heading, not the nested menu items
    if (e.target.className === 'list-group-item-heading') {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }

  render() {
    if (this.requiredTasks.length > 0) {
      return (
        <ListGroupItem
          header={this.props.taskGroup.title}
          onClick={this.toggleExpanded}
          key={this.props.taskGroup.key}
          style={this.taskListGroupStyle}
        >
          {this.state.expanded && this.requiredTasks.map(task => (
            <TaskListItem
              completed={task.completed}
              key={task.title}
              link={task.link}
              patient={this.props.patient}
              title={task.title}
            />
          ))}
        </ListGroupItem>);
    }
    else {
      return (null);
    }
  }
}

TaskListGroup.propTypes = {
  patient: PropTypes.object.isRequired,
  taskGroup: PropTypes.object.isRequired
};

export default TaskListGroup;


