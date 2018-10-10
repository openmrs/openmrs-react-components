/* eslint-disable */
import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/css/CustomDatePicker.css'


const styles = {
  datePickerContainerStyle: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};

class CustomDatePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: props.defaultDate || moment().startOf('day'),
      field: props.field,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { input } = this.props;
    if (typeof input !== 'undefined') {
      const { onChange } = input;
      onChange(moment().format())
    }
  }

  componentWillReceiveProps(nextProps) {
    const { field } = nextProps;
    this.setState({
      field,
    });
  }

  handleChange(date) {
    const { handleDateChange, input } = this.props;
    const { field } = this.state;
    this.setState({
      selectedDate: date,
    });
    
    if (typeof handleDateChange === 'function') {
      handleDateChange(field, date.format('YYYY-MM-DD'));
    } else if (typeof input !== "undefined") {
      const { onChange } = input;
      onChange(date.format());
    }
  }

  render() {
    const { ...otherProps } = this.props;
    const { input } = otherProps;
    let error;
    let defaultDate;


    const hasInput = typeof input !== 'undefined';
    if (hasInput) {
      const { meta } = otherProps;
      error = meta.error;
    }
    const { selectedDate } = this.state;
    const DateDisplayComponent = ({ onClick, value }) => (
      <span>
      <span style={styles.datePickerContainerStyle}>
        <span className={otherProps.labelClassName}>
          {
            otherProps.label
          }
        </span>
        <FormControl
          placeholder=""
          style={this.props.formControlStyle}
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
    return (
      <DatePicker
        customInput={<DateDisplayComponent />}
        onChange={this.handleChange}
        selected={selectedDate}
        excludeDates={hasInput && [moment().add(7, "days")]}
      />
    );
  }
}

CustomDatePicker.defaultProps = {
  labelClassName: '',
  label: '',
  defaultDate: moment(),
  field: '',
  formControlStyle: {
    marginRight: '5px',
    width: '100px'
  },
};

CustomDatePicker.propTypes = {
  defaultDate: PropTypes.object,
  formControlStyle: PropTypes.object,
  field: PropTypes.string,
  handleDateChange: PropTypes.func,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
};

export default CustomDatePicker;
