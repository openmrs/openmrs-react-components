/* eslint-disable */
import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import { startOfDay, format, parse } from 'date-fns';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/css/CustomDatePicker.css'
import '../../../assets/css/widgets.css';
import {DATE_FORMAT} from "../../constants";


const styles = {
  datePickerContainerStyle: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};


class DateDisplay extends PureComponent {
  render(){
    const { onClick, value, usePortalMode, formControlStyle, hasInput, error, label, labelClassName } = this.props;
    return (
      <span>
      <span style={styles.datePickerContainerStyle}>
        <span className={labelClassName}>
          {
            label
          }
        </span>
        <FormControl
          onChange={() => {}}
          onClick={onClick}
          placeholder=""
          readOnly={usePortalMode}
          style={formControlStyle}
          type="text"
          value={value}
        />
        <FontAwesomeIcon
          icon="calendar-alt"
          onClick={onClick}
          size="2x"
        />
      </span>
      {hasInput &&
        ((error &&
          <span className="field-error">
            {error}
          </span>))
      }
      </span>
    );
  }
}

class CustomDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.defaultDate,
      field: props.field,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    const { input, defaultDate } = this.props;
    if (typeof input !== 'undefined') {
      const { onChange } = input;
      if (input.value) {
        this.setState({
          selectedDate: parse(input.value)
        })
      } else {
        if (typeof defaultDate === 'undefined') {
          onChange(undefined);
        } else {
          onChange(format(startOfDay(new Date())));
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { field, input } = nextProps;
    this.setState({
      field,
    });
    if (typeof input !== 'undefined') {
      if (input.value !== this.props.input.value && input.value && input.value !== 'Invalid Date') {
        this.setState({
          selectedDate: parse(input.value)
        });
        input.onChange(format(startOfDay(parse(input.value))));
      }
    }
  }

  handleChange(date) {
    const { handleDateChange, input } = this.props;
    const { field } = this.state;
    this.setState({
      selectedDate: date,
    });
    
    if (typeof handleDateChange === 'function') {
      handleDateChange(field, format(startOfDay(date), 'YYYY-MM-DD'));
    } else if (typeof input !== "undefined") {
      const { onChange } = input;
      onChange(format(startOfDay(date)));
    }
  }

  render() {
    const { ...otherProps } = this.props;
    const { input, usePortalMode } = otherProps;
    const { selectedDate } = this.state;
    let error;
    let selected = new Date(selectedDate);
    let validations = "";

    const hasInput = typeof input !== 'undefined';
    if (hasInput) {
      const { meta } = otherProps;
      error = meta.error;
      selected = selectedDate;
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
      <DatePicker
        customInput={
        <DateDisplay
          hasInput={hasInput}
          usePortalMode={usePortalMode}
          formControlStyle={this.props.formControlStyle}
          error
          label={otherProps.label}
          labelClassName={otherProps.labelClassName}
        />
      }
        dateFormat="dd MMM yyyy"
        onChange={this.handleChange}
        minDate={this.props.minDate}
        selected={selected}
        excludeDates={[hasInput]}
        withPortal={usePortalMode}
      />
    );

    const displayValue = otherProps.displayValue === undefined ? ' ' : format(parse(otherProps.displayValue), DATE_FORMAT);

    const view = (
      <span className="datepicker-view"> {displayValue}</span>
    )

    return (
      <div>
        {!otherProps.mode || otherProps.mode === 'edit' ? edit : view}
        {!otherProps.mode || otherProps.mode === 'edit' ? validations : ' '}
      </div>
    );
  }
}

CustomDatePicker.defaultProps = {
  labelClassName: '',
  label: '',
  field: '',
  formControlStyle: {
    marginRight: '5px',
    width: '110px'
  },
};

CustomDatePicker.propTypes = {
  defaultDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  formControlStyle: PropTypes.object,
  field: PropTypes.string,
  handleDateChange: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  labelClassName: PropTypes.string,
};

export default CustomDatePicker;
