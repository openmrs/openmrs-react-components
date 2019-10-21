import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import formUtil from "../../features/form/util";
import LocalizedMessage from "../localization/LocalizedMessage";
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
    
    if (Array.isArray(list)) {
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
    let dropDownValue = undefined;
    let validations = "";

    if (typeof otherProps.input !== "undefined") {
      dropDownValue = otherProps.input.value;
    }

    if (typeof otherProps.meta !== "undefined") {
      const {
        error,
      } = otherProps.meta;
      
      validations =  (
        <div className="div-error">
          <span
            className='field-error'
            style={{ visibility: error ? 'visible' : 'hidden' }}
          >
            {error ? error : '_'}
          </span>
        </div>
      );
    }
    
    const edit = (
      <span className={otherProps.className}>
        <span className={otherProps.labelClassName}>{otherProps.label}</span>
        <select
          id={otherProps.id}
          onKeyPress={this.props.onKeyPress}
          disabled={otherProps.disabled || false}
          onChange={this.handleChange}
          style={otherProps.dropDownStyle || dropDownStyle}
          value={dropDownValue || otherProps.dropdownValue}
        >
          { otherProps.placeholder && <option
            key={0}
            value={''}
          >{otherProps.placeholder}</option> }
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
        {!otherProps.mode || otherProps.mode === 'edit' ? validations : ' '}
      </div>
    );
  }
}

Dropdown.defaultProps = {
  className: "",
  defaultValue: null,
  label: "",
  labelClassName: "",
  placeholder: <LocalizedMessage
    id="reactcomponents.select.from.list"
    defaultMessage="Select from the list" />
};

Dropdown.propTypes = {
  className: PropTypes.string,
  field: PropTypes.string,
  handleSelect: PropTypes.func,
  input: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  labelClassName: PropTypes.string,
  list: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

export default Dropdown;
