import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import formUtil from "../../features/form/util";
import '../../../assets/css/widgets.css';

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
    const selected = event.target.value;
    if (typeof handleSelect === 'function') {
      handleSelect(field, selected);
    } else if (typeof input !== "undefined") {
      const { onChange } = input;
      onChange(selected);
    }
  }

  render() {
    const { ...otherProps } = this.props;
    let dropDownValue = '';
    if (typeof otherProps.input !== "undefined") {
      dropDownValue = otherProps.input.value;
    }
    
    const edit = (
      <span className={otherProps.className}>
        <span className={otherProps.labelClassName}>{otherProps.label}</span>
        <select
          onChange={this.handleChange}
          style={otherProps.dropDownStyle || dropDownStyle}
          value={dropDownValue}
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

    const view = (
      <span
        className="dropdown-view"
        style={{}}
      >
        {formUtil.conceptAnswerDisplay(otherProps.displayValue, otherProps.list)}
      </span>
    );

    return (
      <div>
        {!otherProps.mode || otherProps.mode === 'edit' ? edit : view}
      </div>
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
  field: PropTypes.string,
  handleSelect: PropTypes.func,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default Dropdown;
