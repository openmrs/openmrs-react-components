import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const dropDownStyle = {
  width: '100%',
  height: '45px',
};

class Dropdown extends PureComponent {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  getListData() {
    const { list, defaultValue } = this.props;
    if (list) {
      return [defaultValue].concat(list);
    }
    return [];
  }

  handleChange(event) {
    const { handleSelect, field } = this.props;
    const selected = event.target.value;
    handleSelect(field, selected);
  }

  render() {
    const { ...otherProps } = this.props;
    return (
      <span className={otherProps.className}>
        <span className={otherProps.labelClassName}>{otherProps.label}</span>
        <select
          onChange={this.handleChange}
          style={dropDownStyle}
        >
          {this.getListData().map(
            item => (
              <option
                key={item}
                value={item}
              >{item}
              </option>
            ),
          )}
        </select>
      </span>
    );
  }
}

Dropdown.defaultProps = {
  className: "",
  defaultValue: null,
  label: "",
  labelClassName: "",
};

Dropdown.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  field: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default Dropdown;
