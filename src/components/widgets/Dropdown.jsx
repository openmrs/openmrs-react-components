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
      if (defaultValue) {
        return [defaultValue].concat(list);
      }
      return list;
    }
    return [];
  }

  handleChange(event) {
    const { handleSelect, field, input } = this.props;

    const { onChange } = input;
    const selected = event.target.value;
    if (typeof handleSelect === 'function') {
      handleSelect(field, selected);
      if (typeof input !== "undefined") {
        onChange(selected);
      }
    } else if (typeof input !== "undefined") {
      onChange(selected);
    }
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
            item => !!item.uuid ? (
              <option
                key={item.uuid}
                value={item.uuid}
              >{item.display || item.name}
              </option>
            ) : (
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
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default Dropdown;
