import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Glyphicon } from 'react-bootstrap';
import '../../../assets/css/widgets.css';

class CheckBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e, checkBoxValue) {
    const { input } = this.props;
    if (typeof input !== 'undefined') {
      if (e.target.checked) {
        this.props.input.onChange(checkBoxValue);
      } else {
        this.props.input.onChange('');
      }
    }
  }

  render() {

    const { title, input, checkBoxValue, mode, displayValue } = this.props;
    const viewModeValue = displayValue ? <Glyphicon glyph="ok" /> : '';

    let checkedStatus = false;
    if (typeof input !== "undefined") {
      checkedStatus = !!(input.value);
    }

    const edit = (
      <span>
        <span>{title}</span>
        <span>
          <Checkbox
            {...input}
            checked={checkedStatus}
            onChange={(e) => this.handleToggle(e, checkBoxValue)}
          />
        </span>
      </span>
    );

    const view = (
      <span>{title} : {viewModeValue} </span>
    );

    return (
      <div>
        {!mode || mode === 'edit' ? edit : view}
      </div>
    );
  }
}

CheckBox.defaultProps = {
  title: "",
  checkBoxValue: "",
};

CheckBox.propTypes = {
  checkBoxTitle: PropTypes.string,
  checkBoxValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  displayValue: PropTypes.object,
  input: PropTypes.object,
  mode: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default CheckBox;
