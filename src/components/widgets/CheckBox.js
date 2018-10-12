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
      onChange('');
    }
  }

  handleToggle(e) {
    const { input } = this.props;
    if (typeof input !== 'undefined') {
      if (e.target.checked) {
        this.props.input.onChange(e.target.value);
      } else {
        this.props.input.onChange('');
      }
    }
  }

  render() {
    const { title, input, checkBoxValue } = this.props;
    return (
      <Checkbox
        {...input}
        onChange={this.handleToggle}
        value={!!(checkBoxValue.uuid) ? checkBoxValue.uuid : checkBoxValue}
      >{title}</Checkbox>
    );
  }
}

CheckBox.defaultProps = {
  title: "",
  checkBoxValue: "",
};

CheckBox.propTypes = {
  checkBoxValue: PropTypes.string.isRequired,
  input: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default CheckBox;
