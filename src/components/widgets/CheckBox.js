import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'react-bootstrap';

class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    const { input } = this.props;
    if (typeof input !== 'undefined') {
      const { onChange } = input;
      onChange(false);
    }
  }

  handleToggle(e) {
    const { input } = this.props;
    if (typeof input !== 'undefined') {
      this.props.input.onChange(e.target.checked);
    }
  }

  render() {
    const { title, input } = this.props;
    return (
      <Checkbox
        {...input}
        onChange={this.handleToggle}
      >{title}</Checkbox>
    );
  }
}

CheckBox.defaultProps = {
  title: ""
};

CheckBox.propTypes = {
  input: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default CheckBox;
