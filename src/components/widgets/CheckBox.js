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
      onChange(' ');
    }
  }

  handleToggle(e) {
    const { input } = this.props;
    if (typeof input !== 'undefined') {
      if (e.target.checked) {
        this.props.input.onChange(e.target.value);
      } else {
        this.props.input.onChange(' ');
      }
    }
  }

  render() {
    const { title, input, options } = this.props;
    return (
      <Checkbox
        {...input}
        onChange={this.handleToggle}
        value={options}
      >{title}</Checkbox>
    );
  }
}

CheckBox.defaultProps = {
  title: " ",
  options: "",
};

CheckBox.propTypes = {
  input: PropTypes.object,
  options: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CheckBox;
