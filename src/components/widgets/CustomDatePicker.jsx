/* eslint-disable */
import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'reactstrap';
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
      if (input.value) {
        this.setState({
          selectedDate: moment(input.value)
        })
      } else {
        onChange(moment().startOf('day').format())
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { field, input } = nextProps;
    this.setState({
      field,
    });
    if (typeof input !== 'undefined') {
      if (input.value !== this.props.input.value) {
        this.setState({
          selectedDate: moment(input.value)
        });
        input.onChange(moment(input.value).startOf('day').format());
      } else {
        input.onChange(moment().startOf('day').format())
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
      handleDateChange(field, date.startOf('day').format('YYYY-MM-DD'));
    } else if (typeof input !== "undefined") {
      const { onChange } = input;
      onChange(date.startOf('day').format());
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
        <Input
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

    const edit = (
      <DatePicker
        customInput={<DateDisplayComponent />}
        onChange={this.handleChange}
        selected={selectedDate}
        excludeDates={hasInput && [moment().add(7, "days")]}
      />
    );

    const view = (
      <span className="datepicker-view">{moment(new Date(otherProps.displayValue)).format(DATE_FORMAT)}</span>
    )

    return (
      <div>
        {!otherProps.mode || otherProps.mode === 'edit' ? edit : view}
      </div>
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
